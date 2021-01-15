import { DMChannel, NewsChannel, TextChannel } from "discord.js";

export async function getMessage(channel: TextChannel | NewsChannel | DMChannel, arg: string) {
  return channel.messages.cache.get(arg)
    || channel.messages.cache.find(message => message.content === arg)
    || await channel.messages.fetch(arg).catch(() => { });
};