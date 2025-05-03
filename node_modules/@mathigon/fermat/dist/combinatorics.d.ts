/** Calculates the factorial of a number x. */
export declare function factorial(x: number): number;
/** Calculates the binomial coefficient nCk of two numbers n and k. */
export declare function binomial(n: number, k: number): number;
/**
 * Returns an array of all possible permutations of an input array arr. In this
 * implementation, we always have permutations(arr)[0] == arr. From
 * http://stackoverflow.com/questions/9960908/permutations-in-javascript
 */
export declare function permutations<T>(arr: T[]): T[][];
/**
 * Returns an array of all possible subsets of an input array (of given length).
 */
export declare function subsets<T>(array: T[], length?: number): T[][];
