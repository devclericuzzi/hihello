export type Operation = (a: number, b: number) => number;

export type Maybe<T> = T | null | undefined;
export type HasAtLeast<T, N extends number> = Tuple<T, N> & readonly T[];
export type Tuple<T, N extends number = 1, R extends readonly T[] = []> = R["length"] extends N
  ? R
  : Tuple<T, N, readonly [T, ...R]>;
