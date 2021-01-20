import { GuildEmojiManager } from "discord.js";

export function getEmoji(emojis: GuildEmojiManager, arg: string, caseInsensitive?: boolean) {
  return emojis.cache.get(arg)
    || emojis.cache.find(emoji => emoji.name === arg)
    || emojis.cache.find(emoji => `:${emoji.name}:` === arg)
    || emojis.cache.find(emoji => emoji.identifier === arg)
    || caseInsensitive ? emojis.cache.find(emoji => emoji.name.toLowerCase() === arg.toLowerCase()) : undefined
    || caseInsensitive ? emojis.cache.find(emoji => `:${emoji.name.toLowerCase()}:` === arg.toLowerCase()) : undefined
    || caseInsensitive ? emojis.cache.find(emoji => emoji.identifier.toLowerCase() === arg.toLowerCase()) : undefined;
};