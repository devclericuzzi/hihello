import { hasAtLeast, hasExactly } from "./arrays";

describe("when measuring array items quantities", () => {
  test("should describe a minimum quantity for an array", () => {
    expect(hasAtLeast([1, 2], 1)).toBe(true);
    expect(hasAtLeast([1, 2], 3)).toBe(false);
  });
});

describe("when asserting an array quantity", () => {
  test("should assert an array length correctly", () => {
    expect(hasExactly([1, 23, 2], 3)).toBe(true);
    expect(hasExactly([1, 2], 2)).toBe(true);
  });
});
