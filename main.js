/*

Compile this file into main.js using the TypeScript compiler: tsc main.ts
Make sure main.js is placed alongside your index.html. */
// Get references to the SVG and the circle
var svg = document.getElementById("mySvg");
var circle = document.getElementById("draggableCircle");
var isDragging = false;
var offsetX = 0;
var offsetY = 0;
function onMouseDown(event) {
    // We are starting to drag the circle
    isDragging = true;
    // Get the current circle center
    var circleX = parseFloat(circle.getAttribute("cx") || "200");
    var circleY = parseFloat(circle.getAttribute("cy") || "200");
    // Find the bounding rectangle of the SVG to adjust mouse coordinates
    var svgRect = svg.getBoundingClientRect();
    // Calculate the offset between mouse position and circle center
    offsetX = event.clientX - svgRect.left - circleX;
    offsetY = event.clientY - svgRect.top - circleY;
}
function onMouseMove(event) {
    if (!isDragging)
        return;
    // Find the bounding rectangle of the SVG
    var svgRect = svg.getBoundingClientRect();
    // New circle center while dragging
    var newX = event.clientX - svgRect.left - offsetX;
    var newY = event.clientY - svgRect.top - offsetY;
    // Set the circle's new position
    circle.setAttribute("cx", newX.toString());
    circle.setAttribute("cy", newY.toString());
}
function onMouseUp() {
    // No longer dragging
    isDragging = false;
}
// Attach event listeners
circle.addEventListener("mousedown", onMouseDown);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseup", onMouseUp);
