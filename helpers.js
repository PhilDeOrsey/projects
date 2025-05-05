"use strict";
// ============
// Helper functions
// ============
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
var clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};
exports.clamp = clamp;
