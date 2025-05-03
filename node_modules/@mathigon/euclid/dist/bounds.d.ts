import { Point } from './point';
import { Rectangle } from './rectangle';
export declare class Bounds {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    /**
     * Use the `errorHandling` option to decide how to deal with cases where the
     * min and max values are in the wrong order.
     */
    constructor(xMin: number, xMax: number, yMin: number, yMax: number, errorHandling?: 'swap' | 'center');
    contains(p: Point): boolean;
    containsX(p: Point): boolean;
    containsY(p: Point): boolean;
    resize(dx: number, dy: number): Bounds;
    get dx(): number;
    get dy(): number;
    get xRange(): [number, number];
    get yRange(): [number, number];
    extend(top: number, right?: number, bottom?: number, left?: number): Bounds;
    get rect(): Rectangle;
    get center(): Point;
    get flip(): Bounds;
}
