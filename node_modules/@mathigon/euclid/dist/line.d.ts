import { Point } from './point';
import { GeoShape, SimplePoint, TransformMatrix } from './utilities';
/** An infinite straight line that goes through two points. */
export declare class Line implements GeoShape {
    readonly p1: Point;
    readonly p2: Point;
    readonly type: string;
    flag?: number;
    readonly ['constructor']: new (p1: Point, p2: Point) => this;
    constructor(p1: Point, p2: Point);
    get length(): number;
    get lengthSquared(): number;
    /** The midpoint of this line. */
    get midpoint(): Point;
    /** The slope of this line. */
    get slope(): number;
    /** The y-axis intercept of this line. */
    get intercept(): number;
    /** The angle formed between this line and the x-axis. */
    get angle(): number;
    /** The point representing a unit vector along this line. */
    get unitVector(): Point;
    /** The point representing the perpendicular vector of this line. */
    get perpendicularVector(): Point;
    /** Finds the line parallel to this one, going through point p. */
    parallel(p: Point): Line;
    /** Finds the line perpendicular to this one, going through point p. */
    perpendicular(p: Point): Line;
    /** The perpendicular bisector of this line. */
    get perpendicularBisector(): Line;
    /** Squared distance between a point and a line. */
    distanceSquared(p: Point): number;
    get line(): Line;
    get ray(): Ray;
    get segment(): Segment;
    /** Signed distance along the line (opposite of .at()). */
    offset(p: SimplePoint): number;
    /** Projects a point `p` onto this line. */
    project(p: SimplePoint): Point;
    /** Returns which side of this line a point p is on (or 0 on the line). */
    side(p: SimplePoint, tolerance?: number): number;
    /** Checks if a point p lies on this line. */
    contains(p: SimplePoint, tolerance?: number): boolean;
    /** Gets the point at a specific offset along the line (opposite of .offset()). */
    at(t: number): Point;
    transform(m: TransformMatrix): this;
    /** Rotates this line by a given angle (in radians), optionally around point `c`. */
    rotate(a: number, c?: Point): this;
    reflect(l: Line): this;
    scale(sx: number, sy?: number): this;
    shift(x: number, y?: number): this;
    translate(p: SimplePoint): this;
    equals(other: Line, tolerance?: number): boolean;
    toString(): string;
}
/** An infinite ray defined by an endpoint and another point on the ray. */
export declare class Ray extends Line {
    readonly type = "ray";
    equals(other: Ray, tolerance?: number): boolean;
    contains(p: Point, tolerance?: number): boolean;
    toString(): string;
}
/** A finite line segment defined by its two endpoints. */
export declare class Segment extends Line {
    readonly type = "segment";
    contains(p: Point, tolerance?: number): boolean;
    project(p: SimplePoint): Point;
    /** Contracts (or expands) a line by a specific ratio. */
    contract(x: number): Segment;
    equals(other: Segment, tolerance?: number, oriented?: boolean): boolean;
    toString(): string;
}
