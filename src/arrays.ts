import type { HasAtLeast, Maybe, Tuple } from "./types";

/**
 * Tests if the given array has AT LEAST x amount of items
 * @param array the array to be evaluated
 * @param length the minimum length expected
 * @returns TRUE, if the array length is greater or equals to the provided length
 */
export function hasAtLeast<T, N extends number>(array: Maybe<ReadonlyArray<T>>, length: N): array is HasAtLeast<T, N> {
  return array != null && array.length >= length;
}
/**
 * Tests if the given array has EXACTLY x amount of items
 * @param array the array to be evaluated
 * @param length the length expected
 * @returns TRUE, if the array length is equals to the provided length
 */
export function hasExactly<T, N extends number>(array: Maybe<ReadonlyArray<T>>, length: N): array is Tuple<T, N> {
  return array?.length === length;
}
