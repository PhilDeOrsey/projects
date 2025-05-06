// =======================
// New interactive canvas class for optics
// Phil DeOrsey
// =======================

import {Line, Point} from "@mathigon/euclid";

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

export class OpticsSim {
    private isDragging = false;
    private currentShape: SVGGraphicsElement | null = null;
    private currentShapeType: ShapeConfig["type"] | null = null;
    private offsetX = 0;
    private offsetY = 0;
    private mirrorLines: Line[] = [];
    private config: OpticsSimConfig;
    private imageMap: Map<string, SVGElement[]> = new Map();

    constructor(config: OpticsSimConfig) {
        this.config = config;
        this.setupMirrors();
        this.initializeShapes();
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

    private initializeShapes(): void {
        const {svg, shapes, bounds} = this.config;
        // Clear existing shapes
        svg.innerHTML = '';

        // Create room boundary shape config
        const roomBoundary: ShapeConfig = {
            id: "room-boundary",
            type: "path",
            attributes: {
                d: `M ${bounds.x},${bounds.y} 
           L ${bounds.x + bounds.width},${bounds.y} 
           L ${bounds.x + bounds.width},${bounds.y + bounds.height} 
           L ${bounds.x},${bounds.y + bounds.height} 
           Z`,
                fill: "none",
                stroke: "#cccccc",
                strokeWidth: "2"
            },
            draggable: false
        };

        // Combine room boundary with other shapes
        const allShapes = [roomBoundary, ...shapes];

        // Create and append all shapes
        allShapes.forEach(shapeData => {
            const shapeEl = this.createShape(shapeData);

            // TODO create all images
            if (shapeData.type === "circle") {
                // TODO: better typing
                const point = this.reflectCircle(shapeEl, this.mirrorLines[1])!;
                const imageCircle = this.createShape({
                    id: shapeData.id,
                    type: "circle",
                    attributes: {
                        cx: point.x,
                        cy: point.y,
                        r: shapeData.attributes.r,
                        fill: "gray"
                    },
                    draggable: false
                });
                svg.appendChild(imageCircle);
                this.imageMap.set(shapeData.id, [...(this.imageMap.get(shapeData.id) || []), imageCircle]);
            } else {
                // do this for polygons
                const imagePoints = this.reflectPolygon(shapeEl, this.mirrorLines[1]) || '';
                const imagePolygon = this.createShape({
                    id: shapeData.id,
                    type: "polygon",
                    attributes: {
                        points: imagePoints,
                        fill: "gray"
                    },
                    draggable: false
                });
                svg.appendChild(imagePolygon);
                this.imageMap.set(shapeData.id, [...(this.imageMap.get(shapeData.id) || []), imagePolygon]);
            }

            svg.appendChild(shapeEl);
        });
    }

    private bindEvents(): void {
        this.config.svg.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
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

    private drawMirror(line: Line, name: string) {
        const [p1, p2] = [line.p1, line.p2]
        this.config.svg.append(this.createShape({
            id: name,
            type: "path",
            attributes: {
                d: `M ${p1.x},${p1.y} L ${p2.x},${p2.y}`,
                fill: "none",
                stroke: "blue",
                strokeWidth: "6"
            },
            draggable: false
        }));
    }

    private onMouseDown(event: MouseEvent): void {
        const target = event.target as SVGGraphicsElement;
        if (!target || !(target instanceof SVGGraphicsElement)) return;

        const draggable = target.getAttribute("data-draggable") === "true";
        if (!draggable) return;

        const shapeType = target.getAttribute("data-shape-type") as ShapeConfig["type"];
        if (!shapeType) return;

        this.isDragging = true;
        this.currentShape = target;
        this.currentShapeType = shapeType;
        this.currentShape.style.cursor = "grabbing";

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

    private onMouseMove(event: MouseEvent): void {
        if (!this.isDragging || !this.currentShape || !this.currentShapeType) return;

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

            const imageCircles = this.imageMap.get(this.currentShape.getAttribute("data-shape-id")!);
            for (const c of imageCircles || []) {

                const point = this.reflectCircle(this.currentShape, this.mirrorLines[1])!;
                c.setAttribute("cx", point.x.toString());
                c.setAttribute("cy", point.y.toString());
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

            const imagePolygons = this.imageMap.get(this.currentShape.getAttribute("data-shape-id")!);
            for (const polygon of imagePolygons || []) {

                const points = this.reflectPolygon(this.currentShape, this.mirrorLines[1])!;
                polygon.setAttribute('points', points);
            }
        }
    }

    private getShapeSize(shape: SVGGraphicsElement): { width: number; height: number } {
        const bbox = shape.getBBox();
        return { width: bbox.width, height: bbox.height };
    }


    private onMouseUp(): void {
        if (this.currentShape) {
            this.currentShape.style.cursor = "grab";
        }
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

    // Public methods for external control
    public updateShapes(newShapes: ShapeConfig[]): void {
        this.config.shapes = newShapes;
        this.initializeShapes();
    }

    public updateBounds(newBounds: RoomBounds): void {
        this.config.bounds = newBounds;
    }

    public destroy(): void {
        window.removeEventListener("mousemove", this.onMouseMove.bind(this));
        window.removeEventListener("mouseup", this.onMouseUp.bind(this));
    }
}
