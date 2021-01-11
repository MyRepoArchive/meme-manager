import { Guild, IGuildDb } from "../../models/Guilds";
import { Event } from "../../structures/Event";

const event = new Event('discord_client', 'message', async (client, message) => {
  if (message.channel.type === 'dm') return;

  const prefixDb = ((await Guild.findOne({ guild_id: message.guild!.id })) as IGuildDb | null)?.prefix;
  const prefix = prefixDb || client.defaultPrefix;
  
  if (!prefixDb) new Guild({ guild_id: message.guild!.id }).save();
});

export { event };