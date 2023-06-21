import type { StepDefinitions } from "jest-cucumber";
import { autoBindSteps, loadFeature } from "jest-cucumber";
import {
  currentValue,
  getOperators,
  getParams,
  inputParse,
  isOperator,
  resetCalc,
  setOperators,
  setParams,
} from "./calculator";
import { InvalidInputError, isDivideByZeroError, isInvalidInputError } from "./errors";

beforeEach(() => {
  resetCalc();
  jest.clearAllMocks();
});
const spy = jest.spyOn(console, "log");

describe("when testing an input match", () => {
  test("these should be operators", () => {
    expect(isOperator("+")).toBe(true);
    expect(isOperator("-")).toBe(true);
    expect(isOperator("-")).toBe(true);
    expect(isOperator("/")).toBe(true);
  });
  test("these should not be operators", () => {
    expect(isOperator("a")).toBe(false);
    expect(isOperator("b")).toBe(false);
    expect(isOperator("1")).toBe(false);
    expect(isOperator("0")).toBe(false);
    expect(isOperator("12312406")).toBe(false);
  });
});

describe("When parsing user input", () => {
  test("you cannot have an input with two sequential operators", () => {
    expect(() => inputParse("-2+-")).toThrow(InvalidInputError);
  });
  test("you cannot have invalid operators", () => {
    expect(() => inputParse("-2&")).toThrow(InvalidInputError);
  });
});

describe("params getter and setter", () => {
  test("getting the current value", () => {
    expect(getOperators()).toStrictEqual([]);
  });

  test("setting the current value, and cheking it", () => {
    setParams([1, 2]);
    expect(getParams()).toStrictEqual([1, 2]);
  });
});

describe("operators getter and setter", () => {
  test("getting the current value", () => {
    expect(getOperators()).toStrictEqual([]);
  });

  test("setting the current value, and cheking it", () => {
    setOperators(["-"]);
    expect(getOperators()).toStrictEqual(["-"]);
  });
});

let errorList: string[] = [];
let userInputList: string[] = [];
const feature = loadFeature("src/calculator.feature");
const stepDefinitions: StepDefinitions = ({ given, and, when, then }) => {
  beforeEach(() => {
    errorList = [];
    userInputList = [];

    resetCalc();
    jest.clearAllMocks();
  });

  given(/^a list user inputs that looks like this "(.*)"$/, (input: string) => {
    userInputList = input.split(",");
  });
  when(/^parsing and consuming the inputs$/, () => {
    userInputList.forEach((i) => {
      inputParse(i);
    });
  });
  when(/^parsing and consuming the inputs, with errors$/, () => {
    userInputList.forEach((i) => {
      try {
        inputParse(i);
      } catch (err) {
        if (isInvalidInputError(err)) {
          errorList.push(...err.errors);
        } else if (isDivideByZeroError(err)) {
          errorList.push(err.message);
        }
      }
    });
  });
  then(/^the calculator state should be as follows$/, (payload: string) => {
    const state = {
      currentValue,
      params: getParams(),
      operators: getOperators(),
    };
    expect(state).toStrictEqual(JSON.parse(payload));
  });
  and(/^console.log has been called (\d) times$/, (counter: string) => {
    expect(spy).toHaveBeenCalledTimes(+counter);
  });
  and(/^the error must include the following message "(.*)"$/, (message: string) => {
    expect(errorList.includes(message)).toBe(true);
  });
};
autoBindSteps([feature], [stepDefinitions]);
