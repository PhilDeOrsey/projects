import { Arc } from './arc';
import { Line } from './line';
import { Point } from './point';
import { Rectangle } from './rectangle';
import { GeoShape, SimplePoint, TransformMatrix } from './utilities';
/** A circle with a given center and radius. */
export declare class Circle implements GeoShape {
    readonly c: Point;
    readonly r: number;
    readonly type = "circle";
    constructor(c?: Point, r?: number);
    /** The length of the circumference of this circle. */
    get circumference(): number;
    /** The area of this circle. */
    get area(): number;
    get arc(): Arc;
    tangentAt(t: number): Line;
    collision(r: Rectangle): boolean;
    project(p: Point): Point;
    at(t: number): Point;
    offset(p: Point): number;
    contains(p: Point): boolean;
    transform(m: TransformMatrix): Circle;
    rotate(a: number, c?: Point): Circle;
    reflect(l: Line): Circle;
    scale(sx: number, sy?: number): Circle;
    shift(x: number, y?: number): Circle;
    translate(p: SimplePoint): Circle;
    equals(other: Circle, tolerance?: number): boolean;
    toString(): string;
}
