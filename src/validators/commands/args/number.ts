import { ValidatorData } from ".";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function numberArgumentValidator(data: ValidatorData) {
  let arg = data.joinSpace ? data.args.slice(data.position).join(' ') : data.args[data.position];

  if (data.required && !arg) throw new ValidateError('MISSING_ARGUMENT');

  if (!data.required && !arg) return null;

  if (data.length && arg.length !== data.length) throw new ValidateError('UNVALID_LENGTH', { arg, expected: data.length });
  if (data.minLength && arg.length < data.minLength) throw new ValidateError('LESS_THAN_MIN_LENGTH', { arg, min: data.minLength });

  if (data.maxLength && arg.length > data.maxLength) {
    if (data.cut) arg = arg.slice(0, data.maxLength)
    else throw new ValidateError('MAX_LENGTH_EXCEEDED', { arg, max: data.maxLength });
  };

  const number = Number(arg);

  if (!isFinite(number)) throw new ValidateError('NOT_A_NUMBER', {}, { arg });
  if (data.min && number < data.min) throw new ValidateError('LESS_THAN_MINIMUM', { arg, min: data.min });
  if (data.max && number > data.max) throw new ValidateError('GREATER_THAN_MAXIMUM', { arg, max: data.max });

  return number;
}