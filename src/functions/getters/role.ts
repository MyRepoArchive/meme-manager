import { Guild } from "discord.js";

export async function getRole(guild: Guild, arg: string) {
  return guild.roles.cache.get(arg)
    || guild.roles.cache.find(role => role.name === arg)
    || guild.roles.cache.find(role => role.name.toLowerCase() === arg.toLowerCase())
    || await guild.roles.fetch(arg).catch(() => { });
};