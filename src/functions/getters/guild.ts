import { NewClient } from "../../structures/NewClient";
import { client as _client } from '../../config/instaceClient';

export async function getGuild(client: NewClient = _client, arg: string) {
  return client.guilds.cache.get(arg)
    || client.guilds.cache.find(guild => guild.name === arg)
    || client.guilds.cache.find(guild => guild.name.toLowerCase() === arg.toLowerCase())
    || await client.guilds.fetch(arg).catch(e => {  });
};