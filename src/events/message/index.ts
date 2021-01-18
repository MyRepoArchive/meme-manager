import { getGuildLang } from "../../functions/getters/guildLang";
import { sender } from "../../functions/sender";
import { Guild, IGuildDb } from "../../models/Guilds";
import { Event } from "../../structures/Event";
import { t006, t026, t027 } from "../../utils/texts";

export const event = new Event('discord_client', 'message', async (client, message) => {
  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;

  const prefixDb = (await Guild.findOne({ guild_id: message.guild!.id }) as IGuildDb | null)?.prefix;
  const prefix = prefixDb || client.defaultPrefix;
  
  if (!prefixDb) new Guild({ guild_id: message.guild!.id }).save();
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const comando = args.shift()?.toLowerCase();
  const permissions = message.channel.permissionsFor(client.user!)!;
  const guildLang = await getGuildLang(message.guild!.id);

  if ([`<@${client.user!.id}>`, `<@!${client.user!.id}>`].includes(message.content)) 
    return sender(message, t027(client, prefix, guildLang), 'cdr').catch(() => {});

  if (!message.content.startsWith(prefix)) return;
  if (!comando) return;

  const cmd = client.commands.get(comando) || client.commands.get(client.aliases.get(comando) || '');
  
  if (!cmd) return sender(message, t026(guildLang), 'cd').catch(() => {});

  try {
    cmd.index({ message, args, client, comando, permissions, prefix, guildLang });
  } catch (err) {
    console.error(t006(comando, err));
  };
});