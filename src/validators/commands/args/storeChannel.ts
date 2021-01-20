import { StoreChannel } from "discord.js";
import { ValidatorData } from ".";
import { getChannel } from "../../../functions/getters/channel";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function storeChannelArgumentValidator(data: ValidatorData, arg: string) {
  const storeChannel = await getChannel(
    data.thisGuild
      ? data.message.guild!.channels.cache
      : data.client.guildChannels(),
    arg,
    data.caseInsensitive,
    'store'
  ) as StoreChannel | undefined;

  if (!storeChannel) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

  return storeChannel;
};