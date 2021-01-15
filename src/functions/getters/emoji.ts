import { GuildEmojiManager } from "discord.js";

export function getEmoji(emojis: GuildEmojiManager, arg: string) {
  return emojis.cache.get(arg)
    || emojis.cache.find(emoji => emoji.name === arg)
    || emojis.cache.find(emoji => `:${emoji.name}:` === arg)
    || emojis.cache.find(emoji => emoji.identifier === arg)
    || emojis.cache.find(emoji => emoji.name.toLowerCase() === arg.toLowerCase())
    || emojis.cache.find(emoji => `:${emoji.name.toLowerCase()}:` === arg.toLowerCase())
    || emojis.cache.find(emoji => emoji.identifier.toLowerCase() === arg.toLowerCase());
};