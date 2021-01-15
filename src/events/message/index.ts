import { Guild, IGuildDb } from "../../models/Guilds";
import { Event } from "../../structures/Event";
import { t006 } from "../../utils/texts";

export const event = new Event('discord_client', 'message', async (client, message) => {
  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;

  const prefixDb = (await Guild.findOne({ guild_id: message.guild!.id }) as IGuildDb | null)?.prefix;
  const prefix = prefixDb || client.defaultPrefix;
  
  if (!prefixDb) new Guild({ guild_id: message.guild!.id }).save();
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const comando = args.shift()?.toLowerCase();
  const permissions = message.channel.permissionsFor(client.user!)!;

  if (!message.content.startsWith(prefix)) return;
  if (!comando) return;

  const cmd = client.commands.get(comando) || client.commands.get(client.aliases.get(comando) || '');

  if (!cmd) return;

  try {
    cmd.index({ message, args, client, comando, permissions, prefix });
  } catch (err) {
    console.error(t006(comando, err));
  };
});