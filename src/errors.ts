const defaultMessage = "There is no division by zero";
/**
 * Maintains type consistency when handling errors
 * @param err something thrown
 * @returns TRUE, if the given object is an DivideByZeroError instance, or if it's properties somehow contains the ones from DivideByZeroError
 */
export function isDivideByZeroError(err: unknown): err is DivideByZeroError {
  if (!err) return false;
  else if (err instanceof DivideByZeroError) return true;
  // @ts-ignore This is valid in this case
  else return !!err.divisionByZero && err.message == defaultMessage;
}
/**
 * Maintains type consistency when handling errors
 * @param err something thrown
 * @returns TRUE, if the given object is an InvalidInputError instance, or if it's properties somehow contains the ones from InvalidInputError
 */
export function isInvalidInputError(err: unknown): err is InvalidInputError {
  if (!err) return false;
  else if (err instanceof InvalidInputError) return true;
  // @ts-ignore This is valid in this case
  else return !!err.errors && err.message == "Invalid input format";
}

export class DivideByZeroError extends Error {
  public divisionByZero = true;
  constructor() {
    super(defaultMessage);
  }
}
export class InvalidInputError extends Error {
  public errors: string[] = [];
  constructor(errors: string[]) {
    super("Invalid input format");
    this.errors = errors;
  }
}
