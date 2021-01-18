import { Command } from "../../structures/Command";
import { t009, t010 } from "../../utils/texts";

export const command = new Command({
  name: 'ping',
  created_timestamp: Date.now(),
  updated_timestamp: Date.now(),
  version: '1.0'
}, async ({ message, client, guildLang }) => {
  const msg = await message.channel.send(t010(guildLang));
  msg.edit(t009(msg.createdTimestamp - message.createdTimestamp, client, guildLang));
});