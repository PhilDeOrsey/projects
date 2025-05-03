import { Bounds } from './bounds';
import { Line } from './line';
import { GeoElement, SimplePoint, TransformMatrix } from './utilities';
/** A single point class defined by two coordinates x and y. */
export declare class Point implements GeoElement, SimplePoint {
    readonly x: number;
    readonly y: number;
    readonly type = "point";
    constructor(x?: number, y?: number);
    get unitVector(): Point;
    get length(): number;
    get inverse(): Point;
    get flip(): Point;
    get perpendicular(): Point;
    get array(): number[];
    /** Finds the perpendicular distance between this point and a line. */
    distanceFromLine(l: Line): number;
    /** Clamps this point to specific bounds. */
    clamp(bounds: Bounds, padding?: number): Point;
    changeCoordinates(originCoords: Bounds, targetCoords: Bounds): Point;
    add(p: SimplePoint): Point;
    subtract(p: SimplePoint): Point;
    round(inc?: number): Point;
    floor(): Point;
    mod(x: number, y?: number): Point;
    angle(c?: Point): number;
    snap(p: Point, tolerance?: number): Point;
    /** Calculates the average of multiple points. */
    static average(...points: SimplePoint[]): Point;
    /** Calculates the dot product of two points p1 and p2. */
    static dot(p1: SimplePoint, p2: SimplePoint): number;
    static sum(p1: SimplePoint, p2: SimplePoint): Point;
    static difference(p1: SimplePoint, p2: SimplePoint): Point;
    /** Returns the Euclidean distance between two points p1 and p2. */
    static distance(p1: SimplePoint, p2: SimplePoint): number;
    /** Returns the Manhattan distance between two points p1 and p2. */
    static manhattan(p1: SimplePoint, p2: SimplePoint): number;
    /** Interpolates two points p1 and p2 by a factor of t. */
    static interpolate(p1: SimplePoint, p2: SimplePoint, t?: number): Point;
    /** Interpolates a list of multiple points. */
    static interpolateList(points: SimplePoint[], t?: number): Point;
    /** Creates a point from polar coordinates. */
    static fromPolar(angle: number, r?: number): Point;
    static random(b: Bounds): Point;
    static equals(p1: SimplePoint, p2: SimplePoint, precision?: number): boolean;
    /** Check if p1, p2 and p3 lie on a straight line. */
    static colinear(p1: SimplePoint, p2: SimplePoint, p3: SimplePoint, tolerance?: number): boolean;
    /** Transforms this point using a 2x3 matrix m. */
    transform(m: TransformMatrix): Point;
    /** Rotates this point by a given angle (in radians) around point `c`. */
    rotate(angle: number, c?: SimplePoint): Point;
    /** Reflects this point across a line l. */
    reflect(l: Line): Point;
    scale(sx: number, sy?: number): Point;
    shift(x: number, y?: number): Point;
    translate(p: SimplePoint): Point;
    equals(other: GeoElement | SimplePoint, precision?: number): boolean;
    toString(): string;
}
export declare const ORIGIN: Point;
