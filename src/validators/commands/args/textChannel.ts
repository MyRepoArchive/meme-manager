import { TextChannel } from "discord.js";
import { ValidatorData } from ".";
import { getChannel } from "../../../functions/getters/channel";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function textChannelArgumentValidator(data: ValidatorData, arg: string) {
  const textChannel = data.message.mentions.channels?.map(channel => channel)[data.mentionPosition || 0] || await getChannel(
    data.thisGuild
      ? data.message.guild!.channels.cache
      : data.client.guildChannels(),
    arg,
    data.caseInsensitive,
    'text'
  ) as TextChannel | undefined;

  if (!textChannel) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return textChannel;
};