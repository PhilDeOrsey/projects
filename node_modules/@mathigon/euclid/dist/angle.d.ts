import { Arc } from './arc';
import { Line } from './line';
import { Point } from './point';
import { Polygon } from './polygon';
import { GeoShape, SimplePoint, TransformMatrix } from './utilities';
/** Convert angles in radians to degrees. */
export declare function toDeg(n: number): number;
/** Convert angles in degrees to radians. */
export declare function toRad(n: number): number;
/** A 2-dimensional angle class, defined by three points. */
export declare class Angle implements GeoShape {
    readonly a: Point;
    readonly b: Point;
    readonly c: Point;
    readonly type = "angle";
    constructor(a: Point, b: Point, c: Point);
    static fromDegrees(val: number): Angle;
    static fromRadians(val: number): Angle;
    /** Checks if `a` and `b` are roughly equivalent (by default, within one degree of eachother) */
    static equals(a: Angle, b: Angle, precision?: number): boolean;
    /** The size, in radians, of this angle. */
    get rad(): number;
    /** The size, in degrees, of this angle. */
    get deg(): number;
    /** Checks if this angle is right-angled. */
    get isRight(): boolean;
    /** The bisector of this angle. */
    get bisector(): Line | undefined;
    /** Returns the smaller one of this and its supplementary angle. */
    get sup(): Angle;
    /** Returns the Arc element corresponding to this angle. */
    get arc(): Arc;
    /** Radius of the arc or sector representing this angle. */
    get radius(): number;
    /** Shape object that can be used to draw this angle. */
    shape(filled?: boolean, radius?: number, round?: boolean): Polygon | Arc;
    project(p: Point): Point;
    at(): Point;
    offset(): number;
    contains(p: Point): boolean;
    transform(m: TransformMatrix): Angle;
    rotate(a: number, c?: SimplePoint): Angle;
    reflect(l: Line): Angle;
    scale(sx: number, sy?: number): Angle;
    shift(x: number, y?: number): Angle;
    translate(p: SimplePoint): Angle;
    equals(a: Angle, precision?: number): boolean;
    toString(): string;
}
