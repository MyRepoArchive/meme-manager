import { Snowflake } from "discord.js";
import { client } from "../../config/instaceClient";
import { Guild, IGuildDb } from '../../models/Guilds';

export async function getGuildLang(guild_id: Snowflake) {
  return (await Guild.findOne({ guild_id }) as IGuildDb | null)?.lang || client.lang;
};