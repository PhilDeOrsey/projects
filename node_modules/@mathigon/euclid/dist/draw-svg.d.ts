import { Point } from './point';
import { Rectangle } from './rectangle';
import { GeoElement } from './utilities';
export type LineMark = 'bar' | 'bar2' | 'arrow' | 'arrow2';
export type LineArrow = 'start' | 'end' | 'both';
export interface SVGDrawingOptions {
    round?: boolean;
    size?: number;
    fill?: string;
    mark?: LineMark;
    arrows?: LineArrow;
    box?: Rectangle;
    cornerRadius?: number;
}
/** Returns the four Cubic Bezier points need to round off a corner */
export declare function getBezierPoints(points: Point[], radius: number): Point[];
export declare function drawRoundedRect(rect: Rectangle, tl: number, tr?: number, br?: number, bl?: number): string;
export declare function drawSVG(obj: GeoElement, options?: SVGDrawingOptions): string;
