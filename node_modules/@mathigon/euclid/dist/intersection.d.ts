import { Point } from './point';
import { GeoShape } from './utilities';
/** Returns the intersection of two or more geometry objects. */
export declare function intersections(...elements: GeoShape[]): Point[];
