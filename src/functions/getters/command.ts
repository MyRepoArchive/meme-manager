import { NewClient } from "../../structures/NewClient";
import { client as _client } from '../../config/instaceClient';

export function getCommand(cmd: string, client: NewClient = _client) {
  return client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd) || '');
};