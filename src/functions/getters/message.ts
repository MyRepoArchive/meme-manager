import { DMChannel, NewsChannel, TextChannel } from "discord.js";

export async function getMessage(channel: TextChannel | NewsChannel | DMChannel, arg: string, caseInsensitive?: boolean) {
  return channel.messages.cache.get(arg)
    || channel.messages.cache.find(message => message.content === arg)
    || caseInsensitive ? channel.messages.cache.find(message => message.content.toLowerCase() === arg.toLowerCase()) : undefined
    || await channel.messages.fetch(arg).catch(() => { });
};