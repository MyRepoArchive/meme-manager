import { CategoryChannel } from "discord.js";
import { ValidatorData } from ".";
import { getChannel } from "../../../functions/getters/channel";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function categoryChannelArgumentValidator(data: ValidatorData, arg: string) {
  const categoryChannel = await getChannel(
    data.thisGuild
      ? data.message.guild!.channels.cache
      : data.client.guildChannels(),
    arg,
    data.caseInsensitive,
    'category'
  ) as CategoryChannel | undefined;

  if (!categoryChannel) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return categoryChannel;
};