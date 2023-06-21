import { DivideByZeroError } from "./errors";
import { diff, divide, sum, times } from "./operations";

describe("when adding numbers", () => {
  test("adding with zero as one of the factors", () => {
    expect(sum(100, 0)).toBe(100);
  });
  test("two numbers", () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(-2, 3)).toBe(1);
  });
  test("two zeros", () => {
    expect(sum(0, 0)).toBe(0);
  });
  test("operators order does not matter", () => {
    expect(sum(2, 3)).toBe(sum(3, 2));
  });
});

describe("when subtracting numbers", () => {
  test("subtracting with zero as one of the factors", () => {
    expect(sum(100, 0)).toBe(100);
  });
  test("two numbers", () => {
    expect(diff(3, 2)).toBe(1);
    expect(diff(2, 3)).toBe(-1);
    expect(diff(-2, 3)).toBe(-5);
  });
  test("two zeros", () => {
    expect(diff(0, 0)).toBe(0);
  });
  test("operators order DOES matter", () => {
    expect(diff(2, 3)).not.toBe(diff(3, 2));
  });
});

describe("when multiplying numbers", () => {
  test("multiplying with zero as one of the factors", () => {
    expect(times(0, 100)).toBe(0);
    expect(times(100, 0)).toBe(0);
  });
  test("two numbers", () => {
    expect(times(5, 2)).toBe(10);
    expect(times(3, 2)).toBe(6);
    expect(times(2, 3)).toBe(6);
    expect(times(-2, 3)).toBe(-6);
  });
  test("two zeros", () => {
    expect(diff(0, 0)).toBe(0);
  });
  test("operators order does not matter", () => {
    expect(times(2, 3)).toBe(times(3, 2));
  });
});

describe("when dividing numbers", () => {
  test("dividing with zero as one of the factors", () => {
    expect(() => divide(0, 100)).toThrow(DivideByZeroError);
    expect(() => divide(100, 0)).toThrow(DivideByZeroError);
  });
  test("two numbers", () => {
    expect(divide(5, 2)).toBe(2.5);
    expect(divide(3, 2)).toBe(1.5);
    expect(divide(10, 2)).toBe(5);
    expect(divide(10, -2)).toBe(-5);
  });
  test("two zeros", () => {
    expect(() => divide(0, 0)).toThrow(DivideByZeroError);
  });
  test("operators order DOES matter", () => {
    expect(divide(2, 3)).not.toBe(divide(3, 2));
  });
});
