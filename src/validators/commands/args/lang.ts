import { ValidatorData } from ".";
import { ValidateError } from "../../../structures/errors/ValidateError";
import { Langs, langsArr } from "../../../structures/NewClient";

export async function langArgumentValidator(data: ValidatorData, arg: string) {
  const lang = arg;

  if (!(data.caseInsensitive ? langsArr.map(x => x.toLowerCase()).includes(lang) : langsArr.includes(lang as Langs))) 
    throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return lang as Langs;
};