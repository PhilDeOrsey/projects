export declare function first<T>(set: Iterable<T>): T | undefined;
/** Iterator version of Array.concat(). */
export declare function concat<T>(...sets: Array<Iterable<T>>): Iterable<T>;
export declare function every<T>(set: Iterable<T>, callback: (v: T) => unknown): boolean;
export declare function some<T>(set: Iterable<T>, callback: (v: T) => unknown): boolean;
/** Iterator version of Array.filter(). */
export declare function filter<T>(set: Iterable<T>, test: (v: T, i: number) => unknown): Iterable<T>;
/** Iterator version of Array.map(). */
export declare function map<T, S>(set: Iterable<T>, fn: (v: T, i: number) => S): Iterable<S>;
export declare function flatMap<S, T>(set: Iterable<T>, map: (x: T) => Iterable<S>): Generator<S, void, unknown>;
export declare function pairs<S, T>(a: Iterable<S>, b: Iterable<T>): Iterable<[S, T]>;
export declare function listPairs<T>(list: T[]): Iterable<[T, T]>;
/** Find the item in an iterable for which value() returns the smallest value. */
export declare function findMin<T>(items: Iterable<T>, value: (item: T) => number, max?: number, min?: number): T | undefined;
