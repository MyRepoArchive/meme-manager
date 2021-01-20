import { NewsChannel } from "discord.js";
import { ValidatorData } from ".";
import { getChannel } from "../../../functions/getters/channel";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function newsChannelArgumentValidator(data: ValidatorData, arg: string) {
  const newsChannel = await getChannel(
    data.thisGuild
      ? data.message.guild!.channels.cache
      : data.client.guildChannels(),
    arg,
    data.caseInsensitive,
    'news'
  ) as NewsChannel | undefined;

  if (!newsChannel) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return newsChannel;
};