/** Calculates the greatest common divisor of multiple numbers. */
export declare function gcd(...numbers: number[]): number;
/** Calculates the lowest common multiple of multiple numbers. */
export declare function lcm(...numbers: number[]): number;
/** Checks if a number n is prime. */
export declare function isPrime(n: number): boolean;
/** Finds the prime factorisation of a number n. */
export declare function primeFactorisation(n: number): number[];
/** Finds all prime factors of a number n. */
export declare function primeFactors(n: number): number[];
/** Lists all prime numbers between 0 and n. */
export declare function listPrimes(n?: number): number[];
/** Generates a random prime number with d digits, where 2 <= d <= 16. */
export declare function generatePrime(d: number): number;
/** Tries to write a number x as the sum of two primes. */
export declare function goldbach(x: number): [number, number];
/** Computes Euler's totient function (phi) for a given natural number x. */
export declare function eulerPhi(x: number): number;
