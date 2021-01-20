import { VoiceChannel } from "discord.js";
import { ValidatorData } from ".";
import { getChannel } from "../../../functions/getters/channel";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function voiceChannelArgumentValidator(data: ValidatorData, arg: string) {
  const voiceChannel = await getChannel(
    data.thisGuild
      ? data.message.guild!.channels.cache
      : data.client.guildChannels(),
    arg,
    data.caseInsensitive,
    'voice'
  ) as VoiceChannel | undefined;

  if (!voiceChannel) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return voiceChannel;
};