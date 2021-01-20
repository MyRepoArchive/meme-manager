import { ValidatorData } from ".";
import { ValidateError } from "../../../structures/errors/ValidateError";
import ms from 'ms';

export async function timeArgumentValidator(data: ValidatorData, arg: string) {
  const time: number | undefined = ms(arg);

  if (!time) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });
  if (data.min && time < data.min) throw new ValidateError('LESS_THAN_MINIMUM', { arg, min: data.min });
  if (data.max && time > data.max) throw new ValidateError('GREATER_THAN_MAXIMUM', { arg, max: data.max });

  return time;
};