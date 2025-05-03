import { Circle } from './circle';
import { Line, Segment } from './line';
import { Point } from './point';
import { GeoShape, SimplePoint, TransformMatrix } from './utilities';
/** A polygon defined by its vertex points. */
export declare class Polygon implements GeoShape {
    readonly type: string;
    readonly points: Point[];
    readonly ['constructor']: new (...points: Point[]) => this;
    constructor(...points: Point[]);
    get circumference(): number;
    /**
     * The (signed) area of this polygon. The result is positive if the vertices
     * are ordered clockwise, and negative otherwise.
     */
    get signedArea(): number;
    get area(): number;
    get centroid(): Point;
    get edges(): Segment[];
    get radius(): number;
    /** The oriented version of this polygon (vertices in clockwise order). */
    get oriented(): this;
    /** Checks if two polygons p1 and p2 collide. */
    static collision(p1: Polygon, p2: Polygon, tolerance?: number): boolean;
    /** Creates a regular polygon. */
    static regular(n: number, radius?: number): Polygon;
    /** Interpolates the points of two polygons */
    static interpolate(p1: Polygon, p2: Polygon, t?: number): Polygon;
    static convexHull(...points: Point[]): Polygon;
    /**
     * Checks if a point p lies inside this polygon, by using a ray-casting
     * algorithm and calculating the number of intersections.
     */
    contains(p: Point): boolean;
    at(t: number): Point;
    offset(p: Point): number;
    project(p: Point): Point;
    /** Center this polygon on a given point or the origin */
    centerAt(on?: Point): this;
    transform(m: TransformMatrix): this;
    /** Rotates this polygon by a given angle (in radians), optionally around point `center`. */
    rotate(a: number, center?: Point): this;
    reflect(line: Line): this;
    scale(sx: number, sy?: number): this;
    shift(x: number, y?: number): this;
    translate(p: SimplePoint): this;
    equals(other: Polygon, tolerance?: number, oriented?: boolean): boolean;
    toString(): string;
}
/** A polyline defined by its vertex points. */
export declare class Polyline extends Polygon {
    readonly type = "polyline";
    get circumference(): number;
    get length(): number;
    /** @returns {Segment[]} */
    get edges(): Segment[];
    toString(): string;
}
/** A triangle defined by its three vertices. */
export declare class Triangle extends Polygon {
    readonly type = "triangle";
    get circumcircle(): Circle | undefined;
    get incircle(): Circle | undefined;
    get orthocenter(): Point;
}
