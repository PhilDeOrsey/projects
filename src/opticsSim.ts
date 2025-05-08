// =======================
// New interactive canvas class for optics
// Phil DeOrsey
// =======================

import {intersections, Line, Point, Polygon, Segment} from "@mathigon/euclid";
import {Color, wait} from "@mathigon/core";

const parsePoints = (pointString: string)=> {
    const points = pointString.split(' ');
    return points.map(point => {
        const [x, y] = point.split(',').map(Number);
        return new Point(x, y);
    });
}

const stringifyPoints = (points: Point[]) => {
    return points.map(point => `${point.x},${point.y}`).join(' ');
}

export interface ShapeConfig {
    id: string;
    type: "circle" | "polygon" | "path";
    attributes: { [key: string]: string | number };
    draggable?: boolean;
}

export type OpticsSimConfig = {
    svg: SVGElement;
    shapes: ShapeConfig[];
    bounds: RoomBounds;
    mirrorLocation?: MirrorLocations;
}

export interface RoomBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

// TODO: Add more mirror positioning options;
type MirrorLocations = 'top-bottom' | 'left-right' | 'all';
type ImageData = {shape: SVGElement, line: Line, id: string};

export class OpticsSim {
    private isDragging = false;
    private currentShape: SVGGraphicsElement | null = null;
    private currentShapeType: ShapeConfig["type"] | null = null;
    private offsetX = 0;
    private offsetY = 0;
    private mirrorLines: Line[] = [];
    private config: OpticsSimConfig;
    /** String is the name of the parent, Image data is the what is needed to construct the image */
    private imageMap: Map<string, ImageData[]> = new Map();
    private reflectionSegments: Segment[][] = [];

    constructor(config: OpticsSimConfig) {
        this.config = config;
        this.setupMirrors();
        this.initializeShapes();
        this.setupReflectionSegments();
        this.bindEvents();
    }

    private createShape(shapeData: ShapeConfig): SVGElement {
        const shapeEl = document.createElementNS("http://www.w3.org/2000/svg", shapeData.type);

        // Apply attributes
        Object.entries(shapeData.attributes).forEach(([attr, value]) => {
            shapeEl.setAttribute(attr, value.toString());
        });

        // Set data attributes
        shapeEl.setAttribute("data-shape-id", shapeData.id);
        shapeEl.setAttribute("data-shape-type", shapeData.type);
        shapeEl.setAttribute("data-draggable", shapeData.draggable ? "true" : "false");

        // Add ARIA attributes for accessibility
        shapeEl.setAttribute("role", "graphics-symbol");
        shapeEl.setAttribute("aria-label", `${shapeData.draggable ? 'Draggable ' : ''}${shapeData.type}`);

        if (shapeData.draggable) {
            shapeEl.style.cursor = "grab";
        }

        return shapeEl;
    }

    private setupReflectionSegments() {
        // Add the room segments

        const {x, y, width, height} = this.config.bounds;
        const roomSegments = [
            new Segment(new Point(x, y), new Point(x + width, y)),
            new Segment(new Point(x + width, y), new Point(x + width, y + height)),
            new Segment(new Point(x + width, y + height), new Point(x, y + height)),
            new Segment(new Point(x, y + height), new Point(x, y))
        ];

        // Add the secondary segments

        const left = [
            new Segment(new Point(x - width, y), new Point(x, y)),
            new Segment(new Point(x, y + height), new Point(x - width, y + height)),
            new Segment(new Point(x - width, y + height), new Point(x - width, y))
        ];

        const right = [
            new Segment(new Point(x + width, y), new Point(x + 2 * width, y)),
            new Segment(new Point(x + 2 * width, y + height), new Point(x + width, y + height)),
            new Segment(new Point(x + 2 * width, y + height), new Point(x + 2 * width, y))
        ];

        const top = [
            new Segment(new Point(x, y - height), new Point(x + width, y - height)),
            new Segment(new Point(x + width, y - height), new Point(x + width, y)),
            new Segment(new Point(x, y), new Point(x, y - height))
        ];

        const bot = [
            new Segment(new Point(x, y + height), new Point(x, y + 2 * height)),
            new Segment(new Point(x, y + 2 * height), new Point(x + width, y + 2 * height)),
            new Segment(new Point(x + width, y + 2 * height), new Point(x + width, y + height))
        ]

        const secondarySegments = [...left, ...right, ...top, ...bot];

        this.reflectionSegments = [roomSegments, secondarySegments];
    }

    private initializeShapes(): void {
        const {svg, shapes, bounds} = this.config;
        // Clear existing shapes
        svg.innerHTML = '';

        // Create room boundary shape config
        const gridSize = 3; // Number of rooms in each direction from center
        const roomWidth = bounds.width;
        const roomHeight = bounds.height;
        const startX = bounds.x - (gridSize * roomWidth);
        const startY = bounds.y - (gridSize * roomHeight);

        const roomBoundary: ShapeConfig = {
            id: "room-boundary",
            type: "path",
            attributes: {
                d: generateGridPath(startX, startY, roomWidth, roomHeight, gridSize * 2 + 1),
                fill: "none",
                stroke: "#cccccc",
                strokeWidth: "2"
            },
            draggable: false
        };

        // Helper function to generate the grid path
        function generateGridPath(startX: number, startY: number, cellWidth: number, cellHeight: number, numCells: number): string {
            let path = '';

            // Draw vertical lines
            for (let i = 0; i <= numCells; i++) {
                const x = startX + (i * cellWidth);
                path += `M ${x},${startY} L ${x},${startY + (numCells * cellHeight)} `;
            }

            // Draw horizontal lines
            for (let i = 0; i <= numCells; i++) {
                const y = startY + (i * cellHeight);
                path += `M ${startX},${y} L ${startX + (numCells * cellWidth)},${y} `;
            }

            return path;
        }


        // Combine room boundary with other shapes
        const allShapes = [roomBoundary, ...shapes];

        // Create and append all shapes
        allShapes.forEach(shapeData => {
            const shapeEl = this.createShape(shapeData);

            this.buildImages({
                svg,
                shapeEl,
                shapeData
            });

            svg.appendChild(shapeEl);
        });
    }

    private bindEvents(): void {
        this.config.svg.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
    }

    // TODO: we should be able to combine these two image functions
    private buildCircleImage(data: {svg: SVGElement, shapeEl: SVGElement, shapeData: ShapeConfig, parentId: string}, line: Line) {
        const {svg, shapeEl, shapeData} = data;
        // TODO: better typing
        const point = this.reflectCircle(shapeEl, line)!;
        const imageCircle = this.createShape({
            id: shapeData.id,
            type: "circle",
            attributes: {
                cx: point.x,
                cy: point.y,
                r: shapeData.attributes.r,
                fill: Color.mix(Color.fromHex(shapeData.attributes.fill.toString()), `#fff`, 0.35).toString(),
            },
            draggable: false
        });
        svg.appendChild(imageCircle);
        this.imageMap.set(data.parentId, [...(this.imageMap.get(data.parentId) || []), {shape: imageCircle, line, id: shapeData.id}]);
        return imageCircle;
    }

    private buildPolygonImage(data: {svg: SVGElement, shapeEl: SVGElement, shapeData: ShapeConfig, parentId: string}, line: Line) {
        const {svg, shapeEl, shapeData} = data;
        const imagePoints = this.reflectPolygon(shapeEl, line) || '';
        const imagePolygon = this.createShape({
            id: shapeData.id,
            type: "polygon",
            attributes: {
                points: imagePoints,
                fill: Color.mix(Color.fromHex(shapeData.attributes.fill.toString()), `#fff`, 0.35).toString(),
            },
            draggable: false
        });
        svg.appendChild(imagePolygon);
        this.imageMap.set(data.parentId, [...(this.imageMap.get(data.parentId) || []), {shape: imagePolygon, line, id: shapeData.id}]);
        return imagePolygon;
    }

    private buildImages(data: {svg: SVGElement, shapeEl: SVGElement, shapeData: ShapeConfig}) {
        const len = this.mirrorLines.length;
        if (data.shapeData.type === "circle") {
            for (let i = 0; i < len; i++) {
                const level1Data = {
                    ...data,
                    shapeData: {
                        ...data.shapeData,
                        id: data.shapeData.id + `reflection${i}`,
                    },
                    parentId: data.shapeData.id,
                }
                const imageCircle = this.buildCircleImage(level1Data, this.mirrorLines[i]);
                for (let j = 0; j < len; j++) {
                    if (i === j) continue;
                    const newData = {
                        ...data,
                        shapeEl: imageCircle,
                        shapeData: {
                            ...data.shapeData,
                            id: data.shapeData.id + `reflection${i}${j}`,
                        },
                        parentId: data.shapeData.id + `reflection${i}`
                    }
                    this.buildCircleImage(newData, this.mirrorLines[j]);
                }
            }
        } else if (data.shapeData.type === 'polygon') {
            for (let i = 0; i < len; i++) {
                const level1Data = {
                    ...data,
                    shapeData: {
                        ...data.shapeData,
                        id: data.shapeData.id + `reflection${i}`,
                    },
                    parentId: data.shapeData.id,
                }
                const imagePolygon = this.buildPolygonImage(level1Data, this.mirrorLines[i]);
                for (let j = 0; j < len; j++) {
                    if (i === j) continue;
                    const newData = {
                        ...data,
                        shapeEl: imagePolygon,
                        shapeData: {
                            ...data.shapeData,
                            id: data.shapeData.id + `reflection${i}${j}`,
                        },
                        parentId: data.shapeData.id + `reflection${i}`
                    }
                    this.buildPolygonImage(newData, this.mirrorLines[j]);
                }
            }
        }
    }

    private setupMirrors() {
        const {mirrorLocation, bounds, svg} = this.config;
        if (!mirrorLocation) return;

        const tl =  new Point(bounds.x, bounds.y);
        const tr = new Point(bounds.x + bounds.width, bounds.y);
        const br = new Point(bounds.x + bounds.width, bounds.y + bounds.height);
        const bl = new Point(bounds.x, bounds.y + bounds.height);

        if (['top-bottom', 'all'].includes(mirrorLocation)) {
            const top = new Line(tl, tr);
            const bot = new Line(bl, br);
            this.mirrorLines.push(...[top, bot]);
            this.drawMirror(top, 'MirrorTop');
            this.drawMirror(bot, 'MirrorBot');
        }

        if (['left-right', 'all'].includes(mirrorLocation)) {
            const left = new Line(tl, bl);
            const right = new Line(tr, br);
            this.mirrorLines.push(...[left, right]);
            this.drawMirror(left, 'MirrorLeft');
            this.drawMirror(right, 'MirrorRight');
        }
    }

    // TODO: Combine this with drawline method
    private drawMirror(line: Line, name: string) {
        const [p1, p2] = [line.p1, line.p2]
        this.config.shapes.push({
            id: name,
            type: "path",
            attributes: {
                d: `M ${p1.x},${p1.y} L ${p2.x},${p2.y}`,
                fill: "none",
                stroke: `#96c8ffd9`,
                'stroke-width': 6
            },
            draggable: false
        });
    }

    private drawSightLine(target: SVGGraphicsElement) {
        this.deleteRay();

        // Extract center point if target is a circle
        let centerPoint = new Point(0, 0);
        if (target.tagName.toLowerCase() === 'circle') {
            const cx = parseFloat(target.getAttribute('cx') || '0');
            const cy = parseFloat(target.getAttribute('cy') || '0');
            centerPoint = new Point(cx, cy);
        } else if (target!.tagName.toLowerCase() === 'polygon') {
            const stringPoints = target.getAttribute('points')!;
            const polygon = new Polygon(...parsePoints(stringPoints));
            centerPoint = polygon.centroid;
        }

        const observer = this.config.svg.querySelector(`[data-shape-id="observer"]`)!;
        let endPoint = new Point(parseFloat(observer.getAttribute('cx') || '0'), parseFloat(observer.getAttribute('cy') || '0'));

        this.drawLine(centerPoint, endPoint, {
            stroke: '#DAA520', // Optional: make the ray visible with a distinct color
            attributes: {
                'data-is-ray': 'true', // Add a data attribute to make the ray findable
                'stroke-dasharray': '8,4', // Longer dashes with shorter gaps
                'stroke-linecap': 'round'
            }
        });

        this.drawLightPath(target, centerPoint, endPoint);

    }

    private async drawLightPath(target: SVGGraphicsElement, clickPoint: Point, endPoint: Point) {
        // get the parent of the target
        const shapeParentId = target.getAttribute('data-shape-id')!.replace(/reflection\d+$/, '');
        const shapeParent = this.config.svg.querySelector(`[data-shape-id="${shapeParentId}"]`)!;

        let startingSource = new Point(0, 0);
        if (shapeParent.tagName.toLowerCase() === 'circle') {
            const cx = parseFloat(shapeParent.getAttribute('cx') || '0');
            const cy = parseFloat(shapeParent.getAttribute('cy') || '0');
            startingSource = new Point(cx, cy);
        } else if (shapeParent!.tagName.toLowerCase() === 'polygon') {
            const stringPoints = shapeParent.getAttribute('points')!;
            const polygon = new Polygon(...parsePoints(stringPoints));
            startingSource = polygon.centroid;
        }

        const seg = new Segment(clickPoint, endPoint);
        let wallHit: Segment | undefined;
        let lastBounce: Point | undefined;

        for (const wall of this.reflectionSegments[0]) {
            const int = intersections(seg, wall);
            if (int.length > 0) {
                wallHit = wall;
                lastBounce = int[0];
                break;
            }
        }

        if (!wallHit) return;

        let firstBounce: Point | undefined;

        for (const wall of this.reflectionSegments[1]) {
            const int = intersections(seg, wall);
            if (int.length > 0) {
                firstBounce = int[0].reflect(new Line(wallHit.p1, wallHit.p2));
                break;
            }
        }

        const bouncePoints = [startingSource, firstBounce, lastBounce, endPoint].filter(t => t !== undefined);

        for (let i = 0; i < bouncePoints.length - 1; i++) {
            const start = bouncePoints[i] as Point;
            const end = bouncePoints[i + 1] as Point;
            await wait(250);
            this.drawLine(start, end, {
                stroke: '#39FF14',
                attributes: {
                    'data-is-ray': 'true',
                    'stroke-linecap': 'round',
                    'stroke-width': '4',
                    opacity: '0.7'
                }
            });
        }

    }

    private onMouseDown(event: MouseEvent): void {
        const target = event.target as SVGGraphicsElement;
        if (!target || !(target instanceof SVGGraphicsElement)) return;

        const isImage = target.getAttribute("data-shape-id")?.includes("reflection");
        if (isImage) {
            this.drawSightLine(target);
            return;
        }

        const draggable = target.getAttribute("data-draggable") === "true";
        if (!draggable) return;

        const shapeType = target.getAttribute("data-shape-type") as ShapeConfig["type"];
        if (!shapeType) return;

        this.isDragging = true;
        this.currentShape = target;
        this.currentShapeType = shapeType;
        this.currentShape.style.cursor = "grabbing";
        target.classList.add('active');

        const svgRect = this.config.svg.getBoundingClientRect();

        if (shapeType === "circle") {
            const cx = parseFloat(target.getAttribute("cx") || "0");
            const cy = parseFloat(target.getAttribute("cy") || "0");
            this.offsetX = event.clientX - svgRect.left - cx;
            this.offsetY = event.clientY - svgRect.top - cy;
        } else {
            const x = parseFloat(parsePoints(target.getAttribute('points')!)[0].x.toString());
            const y = parseFloat(parsePoints(target.getAttribute('points')!)[0].y.toString());
            this.offsetX = event.clientX - svgRect.left - x;
            this.offsetY = event.clientY - svgRect.top - y;
        }
    }

    private deleteRay() {
        const existingRay = this.config.svg.querySelectorAll('[data-is-ray="true"]');
        existingRay.forEach(ray => ray.remove());
    }

    private onMouseMove(event: MouseEvent): void {
        if (!this.isDragging || !this.currentShape || !this.currentShapeType) return;

        this.deleteRay();

        const svgRect = this.config.svg.getBoundingClientRect();
        const bounds = this.config.bounds;

        // Calculate new position
        let newX = event.clientX - svgRect.left - this.offsetX;
        let newY = event.clientY - svgRect.top - this.offsetY;

        // Handle bounds differently for circles vs other shapes
        if (this.currentShapeType === "circle") {
            const radius = parseFloat(this.currentShape.getAttribute("r") || "0");


            // Constrain circle position accounting for radius
            newX = Math.max(
                bounds.x + radius,
                Math.min(newX, bounds.x + bounds.width - radius)
            );
            newY = Math.max(
                bounds.y + radius,
                Math.min(newY, bounds.y + bounds.height - radius)
            );

            this.currentShape.setAttribute("cx", newX.toString());
            this.currentShape.setAttribute("cy", newY.toString());

            const imageCircleData = this.imageMap.get(this.currentShape.getAttribute("data-shape-id")!);
            for (const data of imageCircleData || []) {

                const point = this.reflectCircle(this.currentShape, data.line)!;
                data.shape.setAttribute("cx", point.x.toString());
                data.shape.setAttribute("cy", point.y.toString());

                const childImageCircleData = this.imageMap.get(data.id)!;
                // TODO: this is gross we should have a function that calls itself again
                for (const childData of childImageCircleData || []) {

                    const point = this.reflectCircle(data.shape, childData.line)!;
                    childData.shape.setAttribute("cx", point.x.toString());
                    childData.shape.setAttribute("cy", point.y.toString());

                }
            }
        } else if (this.currentShapeType === "polygon") {
            const pointString = this.currentShape.getAttribute('points');
            if (!pointString) return;
            const points = parsePoints(pointString);

            // Calculate the bounding box of the polygon
            const minX = Math.min(...points.map(p => p.x));
            const minY = Math.min(...points.map(p => p.y));
            const maxX = Math.max(...points.map(p => p.x));
            const maxY = Math.max(...points.map(p => p.y));

            // Ensure the polygon stays within bounds
            const polygonWidth = maxX - minX;
            const polygonHeight = maxY - minY;

            const constrainedX = Math.max(
                bounds.x,
                Math.min(newX, bounds.x + bounds.width - polygonWidth)
            );
            const constrainedY = Math.max(
                bounds.y,
                Math.min(newY, bounds.y + bounds.height - polygonHeight)
            );

            // Calculate final offset
            const finalDx = constrainedX - minX;
            const finalDy = constrainedY - minY;

            // Update all points
            const newPoints = points.map(point => new Point(point.x + finalDx, point.y + finalDy));

            // Convert back to SVG points string format
            const newPointsString = stringifyPoints(newPoints);

            this.currentShape.setAttribute('points', newPointsString);

            const imagePolygonData = this.imageMap.get(this.currentShape.getAttribute("data-shape-id")!);
            for (const data of imagePolygonData || []) {

                const points = this.reflectPolygon(this.currentShape, data.line)!;
                data.shape.setAttribute('points', points);

                const childImagePolygonData = this.imageMap.get(data.id)!;
                // TODO: this is gross we should have a function that calls itself again
                for (const childData of childImagePolygonData || []) {

                    const points = this.reflectPolygon(data.shape, childData.line)!;
                    childData.shape.setAttribute('points', points);

                }
            }
        }
    }

    private onMouseUp(): void {
        if (this.currentShape) {
            this.currentShape.style.cursor = "grab";
        }
        this.currentShape?.classList.remove('active');
        this.isDragging = false;
        this.currentShape = null;
        this.currentShapeType = null;
    }

    private reflectCircle(shape: SVGElement | SVGGraphicsElement, line: Line) {
        if (shape.getAttribute('data-shape-type') !== "circle") return;
        const cx = parseFloat(shape.getAttribute('cx') || '0');
        const cy = parseFloat(shape.getAttribute('cy') || "0");
        const point = new Point(cx, cy);
        return point.reflect(line);
    }

    private reflectPolygon(shape: SVGElement | SVGGraphicsElement, line: Line) {
        if (shape.getAttribute('data-shape-type') !== "polygon") return;
        const points = parsePoints(shape.getAttribute('points')!);
        const reflectedPoints = points.map(point => point.reflect(line));
        return stringifyPoints(reflectedPoints);
    }

    private drawLine(p1: Point, p2: Point, options: {
        stroke?: string,
        strokeWidth?: number,
        id?: string,
        draggable?: boolean,
        attributes?: Record<string, string>
    } = {}): SVGElement {
        const {
            stroke = '#000000',
            strokeWidth = 2,
            id = `line-${Math.random().toString(36).substr(2, 9)}`,
            draggable = false,
            attributes = {}
        } = options;

        const lineConfig: ShapeConfig = {
            id: id,
            type: "path",
            attributes: {
                d: `M ${p1.x},${p1.y} L ${p2.x},${p2.y}`,
                fill: "none",
                stroke: stroke,
                'stroke-width': strokeWidth,
                ...attributes // Spread additional attributes
            },
            draggable: draggable
        };

        const lineElement = this.createShape(lineConfig);
        this.config.svg.appendChild(lineElement);

        return lineElement;
    }

}
