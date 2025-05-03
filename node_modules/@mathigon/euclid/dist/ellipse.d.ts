import { Line } from './line';
import { Point } from './point';
import { GeoShape, SimplePoint, TransformMatrix } from './utilities';
export declare class Ellipse implements GeoShape {
    readonly c: Point;
    readonly type = "ellipse";
    readonly a: number;
    readonly b: number;
    readonly angle: number;
    readonly f1: Point;
    readonly f2: Point;
    /**
     * @param c Center of the ellipse
     * @param a Major axis
     * @param b Minor axis
     * @param angle The rotation of the major axis of the ellipse.
     */
    constructor(c: Point, a: number, b: number, angle?: number);
    get rx(): number | undefined;
    get ry(): number | undefined;
    normalAt(p: Point): Line;
    /** Intersection between an ellipse and a line. */
    intersect(line: Line): Point[];
    /**
     * Creates a new Ellipse. StringLength is the length of string from one foci
     * to a point on the circumference, to the other foci.
     */
    static fromFoci(f1: Point, f2: Point, stringLength: number): Ellipse;
    get majorVertices(): Point[];
    get minorVertices(): Point[];
    get extremes(): Point[];
    project(p: Point): Point;
    at(t: number): Point;
    offset(_p: Point): number;
    contains(p: Point): boolean;
    transform(_m: TransformMatrix): this;
    rotate(a: number, c?: Point): Ellipse;
    reflect(l: Line): Ellipse;
    scale(sx: number, sy?: number): Ellipse;
    shift(x: number, y?: number): Ellipse;
    translate(p: SimplePoint): Ellipse;
    equals(other: Ellipse, tolerance?: number): boolean;
    toString(): string;
}
