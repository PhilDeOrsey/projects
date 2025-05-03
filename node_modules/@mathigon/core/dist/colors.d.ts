/** Color generation and conversion class. */
export declare class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a?: number);
    /** Converts this color to a hex string. */
    get hex(): string;
    /** Converts this color to an rgba string. */
    get rgb(): string;
    /** Get the brightness of this color. */
    get brightness(): number;
    /** Converts this color to an HSL array. */
    get hsl(): number[];
    get chroma(): number;
    toString(): string;
    /** Creates a copy of this color. */
    copy(): Color;
    static from(color: Color | string): Color;
    static fromRgb(color: string): Color;
    /** Creates a Color instance from a hex string. */
    static fromHex(hex: string): Color;
    static fromHsl(h: number, s: number, l: number): Color;
    /** Generates a rainbow gradient with a given number of steps. */
    static rainbow(steps: number): Color[];
    /** Generates a rainbow gradient with a given number of steps. */
    static gradient(colors: Array<Color | string>, steps: number): Color[];
    static shades(color: Color | string, steps: number, range?: number): Color[];
    /** Linearly interpolates two colors or hex strings. */
    static mix(c1: Color | string, c2: Color | string, p?: number): Color;
    static mixMany(colors: Color[], weights?: number[]): Color;
}
