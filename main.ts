// ============
// AI optics simulation
// Phil DeOrsey
// ============

// Get references to the SVG and the circle
import {$N, BaseView, ElementView, HTMLBaseView, SVGParentView, SVGView} from "@mathigon/boost";

const container = document.getElementById("container");
const $container = new HTMLBaseView(container);
const svg = $N('svg', {width: 400, height: 400}, $container);
const circle = $N('circle', {cx: 200, cy: 200, r: 50, fill: 'red'}, svg);

const line = $N('path', {d: 'M 0 0 L 100 100'}, svg);

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

function onMouseDown(event: MouseEvent) {
// We are starting to drag the circle
    isDragging = true;

// Get the current circle center
    const circleX = parseFloat(circle.attr("cx") || "200");
    const circleY = parseFloat(circle.attr("cy") || "200");

// Find the bounding rectangle of the SVG to adjust mouse coordinates
    const svgRect = svg.parent._el.getBoundingClientRect();

// Calculate the offset between mouse position and circle center
    offsetX = event.clientX - svgRect.left - circleX;
    offsetY = event.clientY - svgRect.top - circleY;
}

function onMouseMove(event: MouseEvent) {
    if (!isDragging) return;

// Find the bounding rectangle of the SVG
    const svgRect = svg.parent._el.getBoundingClientRect();

// New circle center while dragging
    const newX = event.clientX - svgRect.left - offsetX;
    const newY = event.clientY - svgRect.top - offsetY;

// Set the circle's new position
    circle.setAttr("cx", newX.toString());
    circle.setAttr("cy", newY.toString());
}

function onMouseUp() {
// No longer dragging
    isDragging = false;
}

// Attach event listeners
circle.on("mousedown", onMouseDown);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseup", onMouseUp);
