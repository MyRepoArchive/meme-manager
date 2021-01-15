import { getGuildLang } from "../../functions/getters/guildLang";
import { Command } from "../../structures/Command";
import { c003, c004 } from "../../utils/texts";

export const command = new Command({
  name: 'ping',
  created_timestamp: Date.now(),
  updated_timestamp: Date.now(),
  version: '1.0'
}, async ({ message, client }) => {
  const guildLang = await getGuildLang(message.guild!.id);
  
  const msg = await message.channel.send(c004(guildLang));
  msg.edit(c003(msg.createdTimestamp - message.createdTimestamp, client, guildLang));
});