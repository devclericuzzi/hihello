import { DivideByZeroError } from "./errors";

export const sum = (a: number, b: number) => a + b;
export const diff = (a: number, b: number) => a - b;
export const times = (a: number, b: number) => a * b;
export const divide = (a: number, b: number) => {
  if (a == 0 || b == 0) throw new DivideByZeroError();
  return a / b;
};
