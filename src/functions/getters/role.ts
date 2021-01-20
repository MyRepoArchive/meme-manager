import { Guild } from "discord.js";

export async function getRole(guild: Guild, arg: string, caseInsensitive?: boolean) {
  return guild.roles.cache.get(arg)
    || guild.roles.cache.find(role => role.name === arg)
    || caseInsensitive ? guild.roles.cache.find(role => role.name.toLowerCase() === arg.toLowerCase()) : undefined
    || await guild.roles.fetch(arg).catch(() => { });
};