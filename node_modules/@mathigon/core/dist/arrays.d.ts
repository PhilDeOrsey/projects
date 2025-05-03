/** Creates an array of size `n`, containing `value` at every entry. */
export declare function repeat<T>(value: T, n: number): T[];
/** Creates a 2D array of size `x` by `y`, containing `value` at every entry. */
export declare function repeat2D<T>(value: T, x: number, y: number): T[][];
/** Creates an array of size `n`, with the result of `fn(i)` at position i. */
export declare function tabulate<T>(fn: (i: number) => T, n: number): T[];
/**
 * Creates a 2D array of size `x` by `y`, with the result of `fn(i, j)` at
 * position (i, j).
 */
export declare function tabulate2D<T>(fn: (i: number, j: number) => T, x: number, y: number): T[][];
/** Creates an array of numbers from 0 to a, or from a to b. */
export declare function list(a: number, b?: number, step?: number): number[];
/** Returns the last item in an array, or the ith item from the end. */
export declare function last<T>(array: T[], i?: number): T;
/** Finds the sum of all elements in an numeric array. */
export declare function total(array: number[]): number;
/** Sorts an array by the return value when evaluating a given function. */
export declare function sortBy<T, S>(array: T[], fn: (x: T) => S, reverse?: boolean): T[];
/**
 * Returns a function that can be called repeatedly, and returns items of the
 * array, continuously looping
 */
export declare function loop<T>(array: T[]): () => T;
/** Filters all duplicate elements from an array. */
export declare function unique<T>(array: T[]): T[];
type Nested<T> = Array<T | Nested<T>>;
/** Flattens a nested array into a single list. */
export declare function flatten<T = unknown>(array: Nested<T>): T[];
/** Creates a cumulative array by adding its elements. */
export declare function cumulative(array: number[]): number[];
/** Breaks an array into chunks of size at most n. */
export declare function chunk<T>(array: T[], n: number): T[][];
/** Rotates the elements of an array by offset. */
export declare function rotate<T>(array: T[], offset?: number): T[];
/** Returns all elements that are in both a1 and a2.  */
export declare function intersect<T = unknown>(a1: T[], a2: T[]): T[];
/** Returns all elements that are only in one of a1 and a2. */
export declare function difference<T>(a1: T[], a2: T[]): T[];
/** Join multiple Arrays */
export declare function join<T = unknown>(...arrays: T[][]): T[];
/** Converts a 2D array to CSV data. */
export declare function toCSV(data: unknown[][]): string;
type LinkedListItem<T> = {
    val: T;
    prev: LinkedListItem<T>;
    next: LinkedListItem<T>;
};
/** Converts an array to a linked list data structure. */
export declare class LinkedList<T> {
    root?: LinkedListItem<T>;
    constructor(items: T[]);
    private traverse;
    get array(): LinkedListItem<T>[];
    delete(node: LinkedListItem<T>): undefined;
}
export declare enum BinarySearchType {
    first = 0,
    firstGreater = 1
}
export type BinarySearchArray<T> = Array<{
    item: T;
    val: number;
}>;
/**
 * Performs binary search on `array`, finding elements with value `value` based
 * on the `type` criteria. The array is assumed to be sorted (small to large)
 * in oder of the value returned by the `getValue()` method.
 */
export declare function binarySearch<T>(array: BinarySearchArray<T>, value: number, type: BinarySearchType): number;
export declare function binaryIndexOf<T>(array: BinarySearchArray<T>, item: T, value: number): number;
export {};
