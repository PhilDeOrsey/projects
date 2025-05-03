type Matrix = number[][];
/** Fills a matrix of size x, y with a given value. */
export declare function fill(value: number, x: number, y: number): number[][];
/** Returns the identity matrix of size n. */
export declare function identity(n?: number): number[][];
export declare function rotation(angle: number): number[][];
export declare function shear(lambda: number): number[][];
export declare function reflection(angle: number): number[][];
/** Calculates the sum of two or more matrices. */
export declare function sum(...matrices: Matrix[]): Matrix;
/** Multiplies a matrix M by a scalar v. */
export declare function scalarProduct(M: Matrix, v: number): number[][];
/** Calculates the matrix product of multiple matrices. */
export declare function product(...matrices: Matrix[]): Matrix;
/** Calculates the transpose of a matrix M. */
export declare function transpose(M: Matrix): number[][];
/** Calculates the determinant of a matrix M. */
export declare function determinant(M: Matrix): number;
/** Calculates the inverse of a matrix M. */
export declare function inverse(M: Matrix): number[][];
export {};
