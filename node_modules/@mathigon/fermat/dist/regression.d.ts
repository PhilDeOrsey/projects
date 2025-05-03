type Coordinate = [number, number];
/**
 * Finds a linear regression that best approximates a set of data. The result
 * will be an array [c, m], where y = m * x + c.
 */
export declare function linear(data: Coordinate[], throughOrigin?: boolean): number[];
/**
 * Finds an exponential regression that best approximates a set of data. The
 * result will be an array [a, b], where y = a * e^(bx).
 */
export declare function exponential(data: Coordinate[]): number[];
/**
 * Finds a logarithmic regression that best approximates a set of data. The
 * result will be an array [a, b], where y = a + b * log(x).
 */
export declare function logarithmic(data: Coordinate[]): number[];
/**
 * Finds a power regression that best approximates a set of data. The result
 * will be an array [a, b], where y = a * x^b.
 */
export declare function power(data: Coordinate[]): number[];
/**
 * Finds a polynomial regression of given `order` that best approximates a set
 * of data. The result will be an array giving the coefficients of the
 * resulting polynomial.
 */
export declare function polynomial(data: Coordinate[], order?: number): number[];
/**
 * Finds the regression coefficient of a given data set and regression
 * function.
 */
export declare function coefficient(data: Coordinate[], fn: (x: number) => number): number;
/** Finds the most suitable polynomial regression for a given dataset. */
export declare function bestPolynomial(data: Coordinate[], threshold?: number, maxOrder?: number): {
    order: number;
    coefficients: number[];
    fn: (x: number) => number;
} | undefined;
export {};
