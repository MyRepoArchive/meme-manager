import { NewClient } from "../../structures/NewClient";
import { client as _client } from '../../config/instaceClient';

export async function getUser(arg: string, client: NewClient = _client, caseInsensitive?: boolean) {
  return client.users.cache.get(arg)
    || client.users.cache.find(user => user.username === arg)
    || client.users.cache.find(user => user.tag === arg)
    || (caseInsensitive ? client.users.cache.find(user => user.username.toLowerCase() === arg.toLowerCase()) : undefined)
    || (caseInsensitive ? client.users.cache.find(user => user.tag.toLowerCase() === arg.toLowerCase()) : undefined)
    || await client.users.fetch(arg).catch(() => { });
};