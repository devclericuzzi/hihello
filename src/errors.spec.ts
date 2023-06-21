import { DivideByZeroError, InvalidInputError, isDivideByZeroError, isInvalidInputError } from "./errors";

describe("when testing a possible division by zero", () => {
  test("non divideByZeroErrors", () => {
    expect(isDivideByZeroError("")).toBe(false);
    expect(isDivideByZeroError(null)).toBe(false);
    expect(isDivideByZeroError(undefined)).toBe(false);
    expect(isDivideByZeroError(new Error("There is no division by zero"))).toBe(false);
    expect(isDivideByZeroError({ message: "Something thrown" })).toBe(false);
    expect(isDivideByZeroError({ message: "Something thrown", divisionByZero: true })).toBe(false);
  });
  test("divideByZeroErrors and divideByZeroLike objects", () => {
    expect(isDivideByZeroError(new DivideByZeroError())).toBe(true);
    expect(isDivideByZeroError({ message: "There is no division by zero", divisionByZero: true })).toBe(true);
  });
});

describe("when testing a possible invalid input", () => {
  const message = "There is no operations defined as '&&'";
  test("non invalidInputErrors", () => {
    expect(isInvalidInputError("")).toBe(false);
    expect(isInvalidInputError(null)).toBe(false);
    expect(isInvalidInputError(undefined)).toBe(false);
    expect(isInvalidInputError(new Error(message))).toBe(false);
    expect(isInvalidInputError({ message: "Something thrown" })).toBe(false);
    expect(isInvalidInputError({ message: "Something thrown", incorrectInput: false })).toBe(false);
  });
  test("InvalidInputErrors and IncorrectInputLike objects", () => {
    expect(isInvalidInputError(new InvalidInputError([]))).toBe(true);
    expect(isInvalidInputError({ message: "Invalid input format", errors: [true] })).toBe(true);
  });
});
