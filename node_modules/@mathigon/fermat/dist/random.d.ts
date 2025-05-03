/** Randomly shuffles the elements in an array a. */
export declare function shuffle<T>(a: T[]): T[];
/** Generates a random integer between 0 and a, or between a and b. */
export declare function integer(a: number, b?: number): number;
/** Chooses a random index value from weights [2, 5, 3] */
export declare function weighted(weights: number[]): number;
/** Randomly selects an element from an array. */
export declare function find<T>(items: T[]): T;
/**
 * Returns a random number between 0 and n, but avoids returning the same
 * number multiple times in a row.
 */
export declare function smart(n: number, id: string): number;
/** Generates a Bernoulli random variable. */
export declare function bernoulli(p?: number): 0 | 1;
/** Generates a Binomial random variable. */
export declare function binomial(n?: number, p?: number): number;
/** Generates a Poisson random variable. */
export declare function poisson(l?: number): number;
/** Generates a uniform random variable. */
export declare function uniform(a?: number, b?: number): number;
/** Generates a normal random variable with mean m and variance v. */
export declare function normal(m?: number, v?: number): number;
/** Generates an exponential random variable. */
export declare function exponential(l?: number): number;
/** Generates a geometric random variable. */
export declare function geometric(p?: number): number | undefined;
/** Generates an Cauchy random variable. */
export declare function cauchy(): number;
/** Generates pdf(x) for the normal distribution with mean m and variance v. */
export declare function normalPDF(x: number, m?: number, v?: number): number;
/** Riemann-integrates fn(x) from xMin to xMax with an interval size dx. */
export declare function integrate(fn: (x: number) => number, xMin: number, xMax: number, dx?: number): number;
/** The chi CDF function. */
export declare function chiCDF(chi: number, deg: number): number;
