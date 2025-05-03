"use strict";
// ============
// AI optics simulation
// Phil DeOrsey
// ============
Object.defineProperty(exports, "__esModule", { value: true });
// Get references to the SVG and the circle
var boost_1 = require("@mathigon/boost");
var container = document.getElementById("container");
var $container = new boost_1.HTMLBaseView(container);
var svg = (0, boost_1.$N)('svg', { width: 400, height: 400 }, $container);
var circle = (0, boost_1.$N)('circle', { cx: 200, cy: 200, r: 50, fill: 'red' }, svg);
var line = (0, boost_1.$N)('path', { d: 'M 0 0 L 100 100' }, svg);
var isDragging = false;
var offsetX = 0;
var offsetY = 0;
function onMouseDown(event) {
    // We are starting to drag the circle
    isDragging = true;
    // Get the current circle center
    var circleX = parseFloat(circle.attr("cx") || "200");
    var circleY = parseFloat(circle.attr("cy") || "200");
    // Find the bounding rectangle of the SVG to adjust mouse coordinates
    var svgRect = svg.parent._el.getBoundingClientRect();
    // Calculate the offset between mouse position and circle center
    offsetX = event.clientX - svgRect.left - circleX;
    offsetY = event.clientY - svgRect.top - circleY;
}
function onMouseMove(event) {
    if (!isDragging)
        return;
    // Find the bounding rectangle of the SVG
    var svgRect = svg.parent._el.getBoundingClientRect();
    // New circle center while dragging
    var newX = event.clientX - svgRect.left - offsetX;
    var newY = event.clientY - svgRect.top - offsetY;
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
