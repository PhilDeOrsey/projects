import { Rectangle } from './rectangle';
import { GeoElement } from './utilities';
export interface CanvasDrawingOptions {
    fill?: string;
    opacity?: number;
    stroke?: string;
    strokeWidth?: number;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
    box?: Rectangle;
}
type CanvasLineCap = 'butt' | 'round' | 'square';
type CanvasLineJoin = 'bevel' | 'miter' | 'round';
export declare function drawCanvas(ctx: CanvasRenderingContext2D, obj: GeoElement, options?: CanvasDrawingOptions): void;
export {};
