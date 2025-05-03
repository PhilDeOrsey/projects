/** Splits a string into space separated words. */
export declare function words(str: string, divider?: RegExp): string[];
/** Converts a string to title case. */
export declare function toTitleCase(str: string): string;
/** Converts a string to camel case. */
export declare function toCamelCase(str: string): string;
/** Checks if a string is a palindrome. */
export declare function isPalindrome(str: string): boolean;
/**
 * Determines the Levenshtein distance between two strings. If ignoreTrailing
 * is true, we will ignore any additional, trailing characters in s2.
 */
export declare function stringDistance(s1: string, s2: string, ignoreTrailing?: boolean): number;
/** Tries to auto-correct a word from a dictionary. */
export declare function autoCorrect(word: string, dict: string[]): string | undefined;
