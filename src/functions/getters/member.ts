import { Guild } from "discord.js";

export async function getMember(guild: Guild, arg: string) {
  return guild.members.cache.get(arg)
    || guild.members.cache.find(member => member.user.username === arg)
    || guild.members.cache.find(member => member.displayName === arg)
    || guild.members.cache.find(member => member.user.tag === arg)
    || guild.members.cache.find(member => member.user.username.toLowerCase() === arg.toLowerCase())
    || guild.members.cache.find(member => member.displayName.toLowerCase() === arg.toLowerCase())
    || guild.members.cache.find(member => member.user.tag.toLowerCase() === arg.toLowerCase())
    || await guild.members.fetch(arg).catch(() => { });
};