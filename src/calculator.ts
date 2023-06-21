import { hasAtLeast, hasExactly } from "./arrays";
import { InvalidInputError, isDivideByZeroError, isInvalidInputError } from "./errors";
import { diff, divide, sum, times } from "./operations";
import type { Operation } from "./types";

export let currentValue = 0;

const chainedParamsWithExclamationRegex = /\d!\d/;
const danglingExclamationRegex = /!{1,}[-+*/=c]/;
const doubleExclamationRegex = /!{2,}/;
const moreThanOneEqualsRegex = /=.*=/;
const operatorsInARowRegex = /[+\-/*]{2,}/;
const invalidCharsRegex = /[^\d+\-*/!=c]/;
const validInputRegex = /(!?\d+)|[-+/*]/;

let params: number[] = [];
let isCleared = true;
let operators: string[] = [];
let lastParam: number | undefined = undefined;
let lastOperator: string | undefined = undefined;

/**
 * not actually needed, but exported for testing purposes
 */
export function getParams() {
  return params;
}
/**
 * not actually needed, but exported for testing purposes
 */
export function setParams(newParams: number[]) {
  params = newParams;
}
/**
 * not actually needed, but exported for testing purposes
 */
export function getOperators() {
  return operators;
}
/**
 * @param newOperators not actually needed, but exported for testing purposes
 */
export function setOperators(newOperators: string[]) {
  operators = newOperators;
}

/**
 * clears the calculator's state
 */
export function resetCalc() {
  isCleared = true;
  params = [];
  operators = [];
  currentValue = 0;
  lastParam = undefined;
  lastOperator = undefined;
}
/**
 * prints out the result
 */
export function result() {
  console.log(currentValue);
}
/**
 * prints the current param in the queue
 * for "ui" purposes only
 */
export function printStatus() {
  if (hasExactly(params, 1)) console.log(params[0]);
}

const operations: Record<string, Operation> = {
  "+": sum,
  "-": diff,
  "*": times,
  "/": divide,
};

/**
 * checks if a given match is an operator
 * @param match the current regex match
 * @returns TRUE, if the matched value is an operator
 */
export function isOperator(match: string) {
  return Number.isNaN(+match) && operations[match] != null;
}
/**
 * a series of regex tests to check all bad cases for an input
 * @param input the input to be validated
 * @returns a list of erros, if any
 */
export function validateInput(input: string) {
  const errors: string[] = [];
  if (input.match(invalidCharsRegex)) errors.push("There are invalid characters on your input");
  if (input.match(operatorsInARowRegex)) errors.push("You cannot have two operators in a row on your input");
  if (input.match(moreThanOneEqualsRegex)) errors.push("You cannot have more than one '=' on your input");
  if (input.match(doubleExclamationRegex)) errors.push("You cannot have two '!' in a row on your input");
  if (input.match(danglingExclamationRegex)) errors.push("An '!' has to come before a number on your input");
  if (input.match(chainedParamsWithExclamationRegex))
    errors.push("You cannot add two sequential params, even if using an '!' between them");

  return errors;
}
/**
 * prints the result in the screen
 */
function inputEquals() {
  consumeParamsAndOperators();
  result();
}
/**
 * clears the current stored value
 */
function inputAC() {
  resetCalc();
  result();
}
/**
 * recursively parses the user's input
 * @param input the user's input
 * @returns nothing, it's a CLOSURE
 */
export function inputParse(input: string) {
  if (!input) return;
  else if (input == "=") {
    inputEquals();
  } else if (input == "c") {
    inputAC();
  } else {
    const errors = validateInput(input);
    if (errors.length > 0) throw new InvalidInputError(errors);

    const match = input.match(validInputRegex);
    if (match) {
      const currentMatch = match[0].startsWith("!") ? match[0].replace("!", "-") : match[0];
      const matchIsOperator = isOperator(currentMatch);
      if (matchIsOperator) operators.push(currentMatch);
      else {
        const currentParam = +currentMatch;
        if (isCleared) {
          isCleared = !isCleared;
          currentValue = currentParam;
        } else params.push(currentParam);
      }

      input = input.substring(currentMatch.length);

      inputParse(input);
    }
  }
}
/**
 * consumes pairs of inputs and operators until there are no more pairs left
 */
export function consumeParamsAndOperators() {
  while (hasAtLeast(params, 1) && hasAtLeast(operators, 1)) {
    try {
      lastParam = params[0];
      lastOperator = operators[0];
      callOperation(operators[0], params[0]);
    } catch (err: unknown) {
      if (isDivideByZeroError(err)) throw err;
      else if (isInvalidInputError(err)) throw err;
      else
        throw new Error(
          `Unexpected operation ${operators[0]} with state ${JSON.stringify({ currentValue, params, operators })}`,
        );
    } finally {
      params.shift();
      operators.shift();
    }
  }
  if (hasExactly(params, 1)) console.log(params[0]);
}
/**
 * calls an operation like so operation(currentValue, param)
 * @param operator the operator to be called upon
 * @param param the param to be passed down to the operation
 */
function callOperation(operator: string, param: number) {
  const operation = operations[operator];
  if (operation) currentValue = operation(currentValue, param);
  else throw new InvalidInputError([`Unexpected operator found: ${operator}`]);
}
