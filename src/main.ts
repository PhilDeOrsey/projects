// ===================
// Optics Sim
// Phil DeOrsey
// ===================

// Interfaces

import {clamp} from "../helpers";

interface ShapeConfig {
    type: "circle" | "rect" | "polygon";
    attributes: { [key: string]: string | number };
    draggable?: boolean;
}

//  Constants

const ROOM_WIDTH = 200;
const ROOM_X = 200;
const ROOM_Y = 200;
const roomBounds = {xMin: ROOM_X, xMax: ROOM_X + ROOM_WIDTH, yMin: ROOM_Y, yMax: ROOM_Y + ROOM_WIDTH};

// Example configuration array for shapes
const shapesConfig: ShapeConfig[] = [
    {
        type: "circle",
        attributes: { cx: 300, cy: 300, r: 20, fill: "red" },
        draggable: true,
    },
    {
        type: "rect",
        attributes: { x: 250, y: 250, width: 75, height: 50, fill: "blue" },
        draggable: true,
    },
    {
        type: "polygon",
        attributes: {
            points: "200,200 400,200 400,400 200,400", // x,y coordinates for each point
            fill: "none",
            stroke: "black",
            strokeWidth: "2"
        },
        draggable: true
    }


];

// Reference to the SVG container
const svg = document.getElementById("mySvg")!;

/**
 We’ll store:
 isDragging: Are we currently dragging a shape?
 currentShape: The element being dragged, if any.
 currentShapeType: "circle" or "rect".
 offsetX, offsetY: Offset from the mouse pointer to the shape’s position.
 */

let isDragging = false;
let currentShape: SVGGraphicsElement | null = null;
let currentShapeType: "circle" | "rect" | null = null;
let offsetX = 0;
let offsetY = 0;

/**
 Create and append shapes from shapesConfig.
 We set data attributes so we know their type and whether they’re draggable.
 */
shapesConfig.forEach((shapeData) => { // Create the SVG element (circle or rect)
    const shapeEl = document.createElementNS("http://www.w3.org/2000/svg", shapeData.type);
// Apply all the provided attributes
    for (const attrName in shapeData.attributes) {
        const attrValue = shapeData.attributes[attrName];
        shapeEl.setAttribute(attrName, attrValue.toString());
    }

// Store shape type and draggable info in data attributes
    shapeEl.setAttribute("data-shape-type", shapeData.type);
    shapeEl.setAttribute("data-draggable", shapeData.draggable ? "true" : "false");

// Append to the SVG
    svg.appendChild(shapeEl);
});

/** Mouse down: If we clicked on a draggable shape, prepare to drag it. */
function onMouseDown(event: MouseEvent) {
    const target = event.target as SVGGraphicsElement | null;
    if (!target || !(target instanceof SVGGraphicsElement)) return;

// Check if shape is marked draggable
    const draggableAttr = target.getAttribute("data-draggable");
    if (draggableAttr !== "true") return;

// Get the shape type (circle or rect)
    const shapeType = target.getAttribute("data-shape-type");
    if (!shapeType) return;

// Begin dragging
    isDragging = true;
    currentShape = target;
    currentShapeType = shapeType as "circle" | "rect";

// Add the active class to the shape being dragged
currentShape.classList.add("active");

// Compute how far the mouse is from the shape’s position
    const svgRect = svg.getBoundingClientRect();

// Get the current shape’s position
    if (currentShapeType === "circle") {
        const cx = parseFloat(target.getAttribute("cx") || "0");
        const cy = parseFloat(target.getAttribute("cy") || "0");
        offsetX = event.clientX - svgRect.left - cx;
        offsetY = event.clientY - svgRect.top - cy;
    } else {
// For rectangles, position is given by (x, y)
        const x = parseFloat(target.getAttribute("x") || "0");
        const y = parseFloat(target.getAttribute("y") || "0");
        offsetX = event.clientX - svgRect.left - x;
        offsetY = event.clientY - svgRect.top - y;
    }
}

/** Mouse move: if a shape is currently being dragged, update its position. */
function onMouseMove(event: MouseEvent) {
    if (!isDragging || !currentShape || !currentShapeType) return;
    const svgRect = svg.getBoundingClientRect();

    const getShift = (side: 'l'|'r'|'t'|'b') => {
        if (currentShapeType === "circle") {
            return parseFloat(currentShape!.getAttribute("r") || "0");
        } else {
            if (side === 'l' || side === 't') return 0;
            return parseFloat(currentShape!.getAttribute(side === 'r' ? "width" : "height") || "0");
        }
    }

// Calculate new position
    const newX = clamp(event.clientX - svgRect.left - offsetX, roomBounds.xMin + getShift('l'), roomBounds.xMax - getShift('r'));
    const newY = clamp(event.clientY - svgRect.top - offsetY, roomBounds.yMin + getShift('t'), roomBounds.yMax - getShift('b'));

// Update the right attributes depending on shape type
    if (currentShapeType === "circle") {
        currentShape.setAttribute("cx", newX.toString());
        currentShape.setAttribute("cy", newY.toString());
    } else {
        currentShape.setAttribute("x", newX.toString());
        currentShape.setAttribute("y", newY.toString());
    }
}

/** Mouse up: stop dragging. */
function onMouseUp() {
    if (currentShape) {
        currentShape.classList.remove("active");
    }
    isDragging = false;
    currentShape = null;
    currentShapeType = null;
}

// Attach the mouse event listeners
svg.addEventListener("mousedown", onMouseDown);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseup", onMouseUp);

