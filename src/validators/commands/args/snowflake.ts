import { ValidatorData } from ".";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function snowflakeArgumentValidator(data: ValidatorData, arg: string) {
  const snowflake = arg;

  if (!isFinite(Number(snowflake))) throw new ValidateError('NOT_A_NUMBER', { arg });

  return snowflake;
}