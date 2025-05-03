/** A basic LRU cache implementation. */
export declare class Cache<T> {
    readonly maxSize: number;
    private store;
    private list;
    constructor(maxSize: number);
    has(a: string): boolean;
    get(a: string): T | undefined;
    set(a: string, b: T): void;
    getOrSet(a: string, callback: (a: string) => T): T;
    private touch;
}
