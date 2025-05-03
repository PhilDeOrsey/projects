import { Line } from './line';
import { Point } from './point';
export type TransformMatrix = [[number, number, number], [number, number, number]];
export type SimplePoint = {
    x: number;
    y: number;
};
export interface GeoElement {
    type: string;
    transform(matrix: TransformMatrix): GeoElement;
    rotate(angle: number, center?: SimplePoint): GeoElement;
    reflect(l: Line): GeoElement;
    scale(sx: number, sy?: number): GeoElement;
    shift(x: number, y?: number): GeoElement;
    translate(p: Point): GeoElement;
    equals(other: GeoElement, tolerance?: number, oriented?: boolean): boolean;
    toString(): string;
}
export interface GeoShape extends GeoElement {
    project(p: Point): Point;
    contains(p: Point, tolerance?: number): boolean;
    at(t: number): Point;
    offset(p: Point): number;
    rotate(angle: number, center?: SimplePoint): GeoShape;
    reflect(l: Line): GeoShape;
    scale(sx: number, sy?: number): GeoShape;
    shift(x: number, y?: number): GeoShape;
    translate(p: SimplePoint): GeoShape;
}
export declare const TWO_PI: number;
export declare function rad(p: SimplePoint, c?: SimplePoint): number;
export declare function findClosest(p: Point, items: GeoShape[]): [Point, number] | undefined;
