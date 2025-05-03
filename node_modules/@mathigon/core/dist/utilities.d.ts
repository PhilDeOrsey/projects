/** Object Map Interface. */
export type Obj<T> = {
    [key: string]: T;
};
/** Creates a random UID string of a given length. */
export declare function uid(n?: number): string;
/** Executes a function or returns the default value. */
export declare function run<T, S>(val: T | ((...args: S[]) => T), ...args: S[]): T;
/** Checks if x is strictly equal to any one of the following arguments. */
export declare function isOneOf<T>(x: T, ...values: T[]): boolean;
/** Deep extends obj1 with obj2, using a custom array merge function. */
export declare function deepExtend(obj1: Obj<unknown>, obj2: Obj<unknown>, arrayMergeFn?: (a: unknown[], b: unknown[]) => unknown[]): void;
/** Replacement for setTimeout() that is synchronous for time 0. */
export declare function delay(fn: () => void, t?: number): number;
/** Returns a promise that resolves after a fixed time. */
export declare function wait(t: number): Promise<void>;
/** Creates a new promise together with functions to resolve or reject. */
export declare function defer<T = void>(): {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: unknown) => void;
};
/**
 * Function wrapper that modifies a function to cache its return values. This
 * is useful for performance intensive functions which are called repeatedly
 * with the same arguments. However it can reduce performance for functions
 * which are always called with different arguments. Note that argument
 * comparison does not work with Objects or nested arrays.
 */
export declare function cache<T, Args extends unknown[]>(fn: (...args: Args) => T): (...args: Args) => NonNullable<T>;
/**
 * Function wrapper that prevents a function from being executed more than once
 * every t ms. This is particularly useful for optimising callbacks for
 * continues events like scroll, resize or slider move. Setting `forceDelay`
 * to `true` means that even the first function call is after the minimum
 * timout, rather than instantly.
 */
export declare function throttle<Args extends unknown[]>(fn: (...args: Args) => void, t?: number, forceDelay?: boolean): (...args: Args) => void;
/** Safe wrapper for JSON.parse. */
export declare function safeToJSON<T>(str?: string | null, fallback?: T, allowedKeys?: string[]): T | undefined;
