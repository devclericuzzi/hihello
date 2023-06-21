import promptSync from "prompt-sync";
import {
  currentValue,
  getOperators,
  getParams,
  inputParse,
  printStatus,
  result,
  setOperators,
  setParams,
} from "./calculator";
import { isDivideByZeroError, isInvalidInputError } from "./errors";

function loop(prompt: promptSync.Prompt) {
  const currentParams = getParams();
  const currentOperators = getOperators();
  try {
    const input = prompt("> ").toLocaleLowerCase();
    if (input) {
      inputParse(input);
      printStatus();
    } else result();
  } catch (err: unknown) {
    if (isInvalidInputError(err)) {
      setParams(currentParams);
      setOperators(currentOperators);
      console.error(`\n${err.message}:\n\t${err.errors.join("\n\t")}\n`);
    } else if (isDivideByZeroError(err)) console.error(`\n${err.message}`);
    else console.error(`Unexpected error occurred: ${JSON.stringify(err)}`);
  }
}
function main() {
  const prompt = promptSync({ sigint: true });
  console.info(currentValue.toString());
  // eslint-disable-next-line no-constant-condition
  while (true) loop(prompt);
}

main();
