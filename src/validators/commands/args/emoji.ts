import { ValidatorData } from ".";
import { getEmoji } from "../../../functions/getters/emoji";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function emojiArgumentValidator(data: ValidatorData, arg: string) {
  const emoji = getEmoji((data.thisGuild ? data.message.guild!.emojis : data.client.emojis), arg, data.caseInsensitive);

  if (!emoji) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return emoji;
};