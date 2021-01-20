import { ValidatorData } from ".";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function stringArgumentValidator(data: ValidatorData, arg: string) {
  const string = arg;

  return string;
}