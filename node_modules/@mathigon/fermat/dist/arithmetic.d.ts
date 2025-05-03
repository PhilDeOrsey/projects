/** Checks if two numbers are nearly equals. */
export declare function nearlyEquals(a: number, b: number, t?: number): boolean;
export declare function isInteger(x: number, t?: number): boolean;
/** Checks if a number x is between two numbers a and b. */
export declare function isBetween(value: number, a: number, b: number, t?: number): boolean;
/** Returns the sign of a number x, as +1, 0 or –1. */
export declare function sign(value: number, t?: number): 0 | 1 | -1;
/**
 * Converts a number to a clean string, by rounding, adding power suffixes, and
 * adding thousands separators. `places` is the number of digits to show in the
 * result.
 */
export declare function numberFormat(n: number, places?: number, separators?: boolean): string;
export declare function scientificFormat(value: number, places?: number): string;
/**
 * Converts a number to a string, including . or , decimal points and
 * thousands separators.
 * @param {string} str
 * @returns {number}
 */
export declare function parseNumber(str: string): number;
/**
 * Converts a number to an ordinal.
 * @param {number} x
 * @returns {string}
 */
export declare function toOrdinal(x: number): string;
/** Spells a number as an English word. */
export declare function toWord(n: number): string;
/** Returns the digits of a number n. */
export declare function digits(n: number): number[];
/** Rounds a number `n` to `precision` decimal places. */
export declare function round(n: number, precision?: number): number;
/** Round a number `n` to the nearest multiple of `increment`. */
export declare function roundTo(n: number, increment?: number): number;
/** Bounds a number between a lower and an upper limit. */
export declare function clamp(x: number, min?: number, max?: number): number;
/** Linear interpolation */
export declare function lerp(a: number, b: number, t?: number): number;
/** Squares a number. */
export declare function square(x: number): number;
/** Cubes a number. */
export declare function cube(x: number): number;
/**
 * Calculates `a mod m`. The JS implementation of the % operator returns the
 * symmetric modulo. Both are identical if a >= 0 and m >= 0 but the results
 * differ if a or m < 0.
 */
export declare function mod(a: number, m: number): number;
/** Calculates the logarithm of `x` with base `b`. */
export declare function log(x: number, b?: number): number;
/** Solves the quadratic equation a x^2 + b x + c = 0 */
export declare function quadratic(a: number, b: number, c: number): number[];
export declare function polynomial(x: number, coefficients: number[]): number;
