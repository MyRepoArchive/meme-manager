import { Message } from "discord.js";
import { Guild, IGuildDb } from '../models/Guilds';

export async function isMeme(message: Message) {
  const guildsWithMemeChannel = await Guild.find({ memes_channel: /./g }) as unknown as IGuildDb[];
  const memesChannels = guildsWithMemeChannel.map(x=> x.memes_channel);

  if (memesChannels.includes(message.channel.id)) {
    message.react('✅').catch(() => {});
    message.react('❌').catch(() => {});
  };
};