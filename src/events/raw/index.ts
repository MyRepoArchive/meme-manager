import { getGuild } from "../../functions/getters/guild";
import { getMember } from "../../functions/getters/member";
import { Event } from "../../structures/Event";
import { Guild, IGuildDb } from '../../models/Guilds';
import { getChannel } from "../../functions/getters/channel";
import { TextChannel } from "discord.js";
import { getMessage } from "../../functions/getters/message";
import { t047, t048 } from "../../utils/texts";

//@ts-ignore
export const event = new Event('discord_client', 'raw', async (client, data) => {
  if (data.t !== 'MESSAGE_REACTION_ADD' && data.t !== 'MESSAGE_REACTION_REMOVE') return;
  
  const guild = await getGuild(client, data.d.guild_id);

  if (!guild) return;

  const member = await getMember(guild, data.d.user_id);

  if (!member) return;
  if (member.user.bot) return;

  const guildDb = await Guild.findOne({ guild_id: data.d.guild_id }) as unknown as IGuildDb;

  if (guildDb && guildDb.memes_channel) {
  } else return;

  const channel = await getChannel(guild.channels.cache, data.d.channel_id) as TextChannel | undefined;

  if (!channel) return;
  if (channel.id !== guildDb.memes_channel) return;

  const message = await getMessage(channel, data.d.message_id);

  if (!message) return;

  if (data.t === 'MESSAGE_REACTION_ADD') {
    const meme = guildDb.memes.find(meme => meme.message_id === data.d.message_id)!;
    
    if (data.d.emoji.name === '👍') { 
      if (!meme) return;
      await Guild.updateOne({ guild_id: data.d.guild_id, 'memes.message_id': data.d.message_id }, { $set: { 'memes.$.votes': meme.votes + 1 } });
    };

    if (data.d.emoji.name === '👎') {
      if (!meme) return;
      await Guild.updateOne({ guild_id: data.d.guild_id, 'memes.message_id': data.d.message_id }, { $set: { 'memes.$.votes': meme.votes - 1 } });
    };
  
    if (!member.hasPermission('ADMINISTRATOR')) {
      if (guildDb && guildDb.meme_role) {
        if (!member.roles.cache.has(guildDb.meme_role)) return;
      } else return;
    };
  
    if (data.d.emoji.name === '❌') {
      Guild.updateOne({ guild_id: data.d.guild_id }, { $pull: { memes: { message_id: data.d.message_id } } });
      
      message.delete().catch(() => {
        guild.owner?.send(t047(guild.name, guildDb.lang)).catch(() => {});
      });
    };
  
    if (data.d.emoji.name === '✅') {
      if (!guildDb.memes.find(x => x.message_id === data.d.message_id))
        await Guild.updateOne({ guild_id: data.d.guild_id }, { $push: { memes: { message_id: data.d.message_id, votes: 0 } } });
  
      await message.reactions.removeAll().catch(() => {
        guild.owner?.send(t048(guild.name, guildDb.lang)).catch(() => {});
      });
  
      message.react('👍').catch(() => {
        guild.owner?.send(t048(guild.name, guildDb.lang)).catch(() => {});
      });
      message.react('👎').catch(() => {});
    };
  };

  if (data.t === 'MESSAGE_REACTION_REMOVE') {
    const meme = guildDb.memes.find(meme => meme.message_id === data.d.message_id)!;

    if (data.d.emoji.name === '👍') { 
      if (!meme) return;
      await Guild.updateOne({ guild_id: data.d.guild_id, 'memes.message_id': data.d.message_id }, { $set: { 'memes.$.votes': meme.votes - 1 } });
    };

    if (data.d.emoji.name === '👎') {
      if (!meme) return;
      await Guild.updateOne({ guild_id: data.d.guild_id, 'memes.message_id': data.d.message_id }, { $set: { 'memes.$.votes': meme.votes + 1 } });
    };
  };
});