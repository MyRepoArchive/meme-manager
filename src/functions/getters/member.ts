import { Guild } from "discord.js";

export async function getMember(guild: Guild, arg: string, caseInsensitive?: boolean) {
  return guild.members.cache.get(arg)
    || guild.members.cache.find(member => member.user.username === arg)
    || guild.members.cache.find(member => member.displayName === arg)
    || guild.members.cache.find(member => member.user.tag === arg)
    || caseInsensitive ? guild.members.cache.find(member => member.user.username.toLowerCase() === arg.toLowerCase()) : undefined
    || caseInsensitive ? guild.members.cache.find(member => member.displayName.toLowerCase() === arg.toLowerCase()) : undefined
    || caseInsensitive ? guild.members.cache.find(member => member.user.tag.toLowerCase() === arg.toLowerCase()) : undefined
    || await guild.members.fetch(arg).catch(() => { });
};