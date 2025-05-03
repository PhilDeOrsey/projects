interface ShapeConfig {
    type: "circle" | "rect";
    attributes: { [key: string]: string | number };
    draggable?: boolean;
}

// Example configuration array for shapes
const shapesConfig: ShapeConfig[] = [
    {
        type: "circle",
        attributes: { cx: 200, cy: 200, r: 20, fill: "red" },
        draggable: true,
    },
    {
        type: "rect",
        attributes: { x: 20, y: 20, width: 50, height: 50, fill: "blue" },
        draggable: true,
    },
];

// Reference to the SVG container
const svg = document.getElementById("mySvg");

/**

 We’ll store:
 isDragging: Are we currently dragging a shape?
 currentShape: The element being dragged, if any.
 currentShapeType: "circle" or "rect".
 offsetX, offsetY: Offset from the mouse pointer to the shape’s position. */

let isDragging = false;
let currentShape: SVGGraphicsElement | null = null;
let currentShapeType: "circle" | "rect" | null = null;
let offsetX = 0;
let offsetY = 0;

/**
 Create and append shapes from shapesConfig.
 We set data attributes so we know their type and whether they’re draggable. */
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

/**

 Mouse down: If we clicked on a draggable shape, prepare to drag it. */ function onMouseDown(event: MouseEvent) { const target = event.target as SVGGraphicsElement | null; if (!target || !(target instanceof SVGGraphicsElement)) return;
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

/**

 Mouse move: if a shape is currently being dragged, update its position. */ function onMouseMove(event: MouseEvent) { if (!isDragging || !currentShape || !currentShapeType) return;
    const svgRect = svg.getBoundingClientRect();

// Calculate new position
    const newX = event.clientX - svgRect.left - offsetX;
    const newY = event.clientY - svgRect.top - offsetY;

// Update the right attributes depending on shape type
    if (currentShapeType === "circle") {
        currentShape.setAttribute("cx", newX.toString());
        currentShape.setAttribute("cy", newY.toString());
    } else {
        currentShape.setAttribute("x", newX.toString());
        currentShape.setAttribute("y", newY.toString());
    }
}

/**

 Mouse up: stop dragging. */ function onMouseUp() { isDragging = false; currentShape = null; currentShapeType = null; }
// Attach the mouse event listeners
svg.addEventListener("mousedown", onMouseDown);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseup", onMouseUp);

