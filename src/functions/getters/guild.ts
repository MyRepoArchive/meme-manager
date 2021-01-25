import { NewClient } from "../../structures/NewClient";
import { client as _client } from '../../config/instaceClient';

export async function getGuild(client: NewClient = _client, arg: string, caseInsensitive?: boolean) {
  return client.guilds.cache.get(arg)
    || client.guilds.cache.find(guild => guild.name === arg)
    || (caseInsensitive ? client.guilds.cache.find(guild => guild.name.toLowerCase() === arg.toLowerCase()) : undefined)
    || await client.guilds.fetch(arg).catch(e => {  });
};