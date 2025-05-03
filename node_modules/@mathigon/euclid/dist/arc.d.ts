import { Circle } from './circle';
import { Line } from './line';
import { Point } from './point';
import { GeoShape, SimplePoint, TransformMatrix } from './utilities';
/** An arc segment of a circle, with given center, start point and angle. */
export declare class Arc implements GeoShape {
    readonly c: Point;
    readonly start: Point;
    readonly angle: number;
    readonly type: string;
    readonly ['constructor']: new (c: Point, start: Point, angle: number) => this;
    constructor(c: Point, start: Point, angle: number);
    get circle(): Circle;
    get radius(): number;
    get end(): Point;
    get startAngle(): number;
    contract(p: number): this;
    get minor(): this;
    get major(): this;
    get center(): Point;
    project(p: Point): Point;
    at(t: number): Point;
    offset(p: Point): number;
    contains(p: Point): boolean;
    transform(m: TransformMatrix): this;
    /** Rotates this arc by a given angle (in radians), optionally around point `c`. */
    rotate(a: number, c?: Point): this;
    reflect(l: Line): this;
    scale(sx: number, sy?: number): this;
    shift(x: number, y?: number): this;
    translate(p: SimplePoint): this;
    equals(): boolean;
    toString(): string;
}
export declare class Sector extends Arc {
    readonly type = "sector";
    contains(p: Point): boolean;
    toString(): string;
}
