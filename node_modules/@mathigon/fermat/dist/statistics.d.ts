/** Calculates the mean of an array of numbers. */
export declare function mean(values: number[]): number;
/** Finds the quantile of an array of numbers for the cumulative probability p. */
export declare function quantile(values: number[], p: number, method?: number): number;
/** Calculates the median of an array of numbers. */
export declare function median(values: number[], method?: number): number;
/**
 * Calculates the mode of an array of numbers. Returns undefined if no mode
 * exists, i.e. there are multiple values with the same largest count.
 */
export declare function mode(values: number[]): number | undefined;
/** Calculates the variance of an array of numbers. */
export declare function variance(values: number[]): number | undefined;
/** Calculates the standard deviation of an array of numbers. */
export declare function stdDev(values: number[]): number;
/** Calculates the covariance of the numbers in two arrays aX and aY. */
export declare function covariance(aX: number[], aY: number[]): number;
/** Calculates the correlation between the numbers in two arrays aX and aY. */
export declare function correlation(aX: number[], aY: number[]): number;
