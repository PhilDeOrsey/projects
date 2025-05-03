/**  Complex number class. */
export declare class Complex {
    re: number;
    im: number;
    constructor(re?: number, im?: number);
    get modulus(): number;
    get argument(): number;
    get conjugate(): Complex;
    /** Returns the ith nth-root of this complex number. */
    root(n: number, i?: number): Complex;
    toString(precision?: number): string;
    add(a: Complex | number): Complex;
    subtract(a: Complex | number): Complex;
    multiply(a: Complex | number): Complex;
    divide(a: Complex | number): Complex;
    /** Calculates the sum of two complex numbers c1 and c2. */
    static sum(c1: Complex | number, c2: Complex | number): Complex;
    /** Calculates the difference of two complex numbers c1 and c2. */
    static difference(c1: Complex | number, c2: Complex | number): Complex;
    /** Calculates the product of two complex numbers c1 and c2. */
    static product(c1: Complex | number, c2: Complex | number): Complex;
    /** Calculates the quotient of two complex numbers c1 and c2. */
    static quotient(c1: Complex | number, c2: Complex | number): Complex;
    /** Calculates e^c for a complex number c. */
    static exp(c: Complex | number): Complex;
}
