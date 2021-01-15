import { GuildChannel } from "discord.js";
import { ValidatorData } from ".";
import { getChannel } from "../../../functions/getters/channel";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function channelArgumentValidator(data: ValidatorData) {
  let arg = data.joinSpace ? data.args.slice(data.position).join(' ') : data.args[data.position];

  if (data.required && !arg) throw new ValidateError('MISSING_ARGUMENT');

  if (!data.required && !arg) return null;

  if (data.length && arg.length !== data.length) throw new ValidateError('UNVALID_LENGTH', { arg, expected: data.length });
  if (data.minLength && arg.length < data.minLength) throw new ValidateError('LESS_THAN_MIN_LENGTH', { arg, min: data.minLength });

  if (data.maxLength && arg.length > data.maxLength) {
    if (data.cut) arg = arg.slice(0, data.maxLength)
    else throw new ValidateError('MAX_LENGTH_EXCEEDED', { arg, max: data.maxLength });
  };

  const channel = data.message.mentions.channels?.map(channel => channel)[data.mentionPosition || 0] || await getChannel(
    data.thisGuild
      ? data.message.guild!.channels.cache
      : data.client.guildChannels(),
    arg,
  ) as GuildChannel | undefined;

  if (!channel) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return channel;
};