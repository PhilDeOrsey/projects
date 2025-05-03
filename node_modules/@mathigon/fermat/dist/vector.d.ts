/** A n-dimensional Vector class. */
export declare class Vector extends Array<number> {
    constructor(...args: number[]);
    /** Returns the magnitude of the Vector */
    get magnitude(): number;
    /** Returns the unitVector of the Vector */
    get unitVector(): number[];
    /** Scales this vector by a factor q. */
    scale(q: number): number[];
    /** Calculates the sum of two vectors v1 and v2. */
    static sum(v1: Vector, v2: Vector): number[];
    /** Calculates the difference of two vectors v1 and v2. */
    static difference(v1: Vector, v2: Vector): number[];
    /** Calculates the element-wise product of two vectors v1 and v2. */
    static product(v1: Vector, v2: Vector): number[];
    /** Calculates the dot product of two vectors v1 and v2. */
    static dot(v1: Vector, v2: Vector): number;
    /** Finds the cross product of two 3-dimensional vectors v1 and v2. */
    static cross(v1: Vector, v2: Vector): Vector;
    /** Checks if two vectors are equal. */
    static equals(v1: Vector, v2: Vector): boolean;
}
