import { GuildChannel } from "discord.js";
import { ValidatorData } from ".";
import { getChannel } from "../../../functions/getters/channel";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function channelArgumentValidator(data: ValidatorData, arg: string) {
  const channel = data.message.mentions.channels?.map(channel => channel)[data.mentionPosition || 0] || await getChannel(
    data.thisGuild
      ? data.message.guild!.channels.cache
      : data.client.guildChannels(),
    arg,
    data.caseInsensitive
  ) as GuildChannel | undefined;

  if (!channel) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return channel;
};