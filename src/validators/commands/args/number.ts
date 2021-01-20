import { ValidatorData } from ".";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function numberArgumentValidator(data: ValidatorData, arg: string) {
  const number = Number(arg);

  if (!isFinite(number)) throw new ValidateError('NOT_A_NUMBER', { arg });
  if (data.min && number < data.min) throw new ValidateError('LESS_THAN_MINIMUM', { arg, min: data.min });
  if (data.max && number > data.max) throw new ValidateError('GREATER_THAN_MAXIMUM', { arg, max: data.max });

  return number;
}