import { Permissions } from "discord.js";
import { getGuildLang } from "../../functions/getters/guildLang";
import { Command } from "../../structures/Command";
import { c003 } from "../../utils/texts";

export const command = new Command({
  name: 'ping',
  permissions: {
    client: new Permissions('ADMINISTRATOR')
  },
  created_timestamp: Date.now(),
  updated_timestamp: Date.now(),
  version: '1.0'
}, async ({ message, client }) => {
  const msg = await message.channel.send('Ping?');
  msg.edit(c003(msg.createdTimestamp - message.createdTimestamp, client, await getGuildLang(message.guild!.id)));
});