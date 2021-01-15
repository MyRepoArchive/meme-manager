import { NewClient } from "../../structures/NewClient";
import { client as _client } from '../../config/instaceClient';

export async function getUser(arg: string, client: NewClient = _client) {
  return client.users.cache.get(arg)
    || client.users.cache.find(user => user.username === arg)
    || client.users.cache.find(user => user.tag === arg)
    || client.users.cache.find(user => user.username.toLowerCase() === arg.toLowerCase())
    || client.users.cache.find(user => user.tag.toLowerCase() === arg.toLowerCase())
    || await client.users.fetch(arg).catch(() => { });
};