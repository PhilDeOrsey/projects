type Suffix = '%' | 'π' | undefined;
/**  Extended Number class. */
export declare class XNumber {
    unit?: Suffix;
    num: number; /** Used for all number types (decimals, fractions, units, ...). */
    den?: number; /** Only used for fractions and always ≥ 0. */
    constructor(num: number, den?: number, unit?: Suffix);
    valueOf(): number;
    toMixed(): string;
    toExpr(type?: 'decimal' | 'fraction' | 'mixed' | 'scientific', precision?: number): string;
    toString(precision?: number): string;
    toMathML(): string;
    /**
     * Returns the value of this number as a decimal. For example, 2/5 and 40%
     * would both return 0.4.
     */
    get value(): number;
    get sign(): number;
    /** Simplifies fractions, e.g. 4/8 would become 1/2. */
    get simplified(): XNumber;
    /** Returns 1/x of this number. */
    get inverse(): XNumber;
    /** Returns -x of this number. */
    get negative(): XNumber;
    get fraction(): number[] | undefined;
    /** Parses a number string, e.g. '1/2' or '20.7%'. */
    static fromString(s: string): XNumber | undefined;
    /** Converts a decimal into the closest fraction with a given maximum denominator. */
    static fractionFromDecimal(x: number, maxDen?: number, precision?: number): XNumber;
    clamp(min?: number, max?: number): XNumber;
    add(a: XNumber | number): XNumber;
    subtract(a: XNumber | number): XNumber;
    multiply(a: XNumber | number): XNumber;
    divide(a: XNumber | number): XNumber;
    /** Calculates the sum of two fractions a and b. */
    static sum(a: XNumber, b: XNumber | number): XNumber;
    /** Calculates the difference of two numbers a and b. */
    static difference(a: XNumber, b: XNumber | number): XNumber;
    /** Calculates the product of two numbers a and b. */
    static product(a: XNumber, b: XNumber | number): XNumber;
    /** Calculates the quotient of two fractions a and b. */
    static quotient(a: XNumber, b: XNumber | number): XNumber;
}
export {};
