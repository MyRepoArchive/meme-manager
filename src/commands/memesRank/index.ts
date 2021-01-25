import { client } from "../../config/instaceClient";
import { Command, CommandConfig, CommandRun } from "../../structures/Command";
import { Guild, IGuildDb } from '../../models/Guilds';
import { getChannel } from "../../functions/getters/channel";
import { t049 } from "../../utils/texts";
import { getMessage } from "../../functions/getters/message";
import { Message, TextChannel } from "discord.js";

const config: CommandConfig = {
  name: 'memesrank',
  aliases: ['rankmemes', 'rank', 'bestmemes'],
  created_timestamp: 1611425412668,
  updated_timestamp: 1611425412668,
  version: '1.0',
  cooldown: 15000,
  description: {
    "en-us": `Displays the 100 memes from the meme channel that got the most votes!`,
    "pt-br": `Exibe os 100 memes do canal de memes que foram mais bem votados!`
  },
  example: `${client.defaultPrefix}memesrank`,
  releases_notes: {
    '1.0': {
      created_timestamp: 1611425412668,
      name: 'Initial'
    }
  },
  usage: `${client.defaultPrefix}memesrank`
};

const run: CommandRun = async ({ message, client, guildLang }) => {
  const guildDb = await Guild.findOne({ guild_id: message.guild!.id }) as unknown as IGuildDb;

  if (!guildDb.memes_channel) return message.channel.send(t049(guildLang)).catch(() => message.react('❌'));
  
  const memeChannel = await getChannel(message.guild!.channels.cache, guildDb.memes_channel) as TextChannel | undefined;
  
  if (!memeChannel) return message.channel.send(t049(guildLang)).catch(() => message.react('❌'));
  
  const memes = await Promise.all(guildDb.memes.filter(meme => meme.votes > 0).sort((a, b) => b.votes - a.votes).map(async meme => {
    const discordMessage = await getMessage(memeChannel, meme.message_id);
    if (!discordMessage) return;
    return [meme, discordMessage];
  }).filter(x => x).slice(0, 100) as Promise<[{ message_id: string, votes: number }, Message]>[]);

  const pages: string[] = [];

  let currentPage = -1;
  for (let i = 1; i <= memes.length; i++) {
    if (i % 10 === 1) {
      currentPage ++;
      pages[currentPage] = `${i}º - \`${memes[i - 1][0].votes} 👍\`: <${memes[i - 1][1].url}>\n`;
    } else {
      pages[currentPage] += `${i}º - \`${memes[i - 1][0].votes} 👍\`: <${memes[i - 1][1].url}>\n`;
    };
  };

  if (!pages.length) return message.channel.send(t049(guildLang)).catch(() => message.react('❌'));

  message.channel.send(pages[0]).then(async mess => {
    await mess.react('➡️').catch(() => {});
    await mess.react('⬅️').catch(() => {});
    await mess.react('⏩').catch(() => {});
    await mess.react('⏪').catch(() => {});
    let page = 1;

    mess.createReactionCollector((reaction, user) => user.id === message.author.id && (
      reaction.emoji.name === '➡️' || 
      reaction.emoji.name === '⬅️' ||
      reaction.emoji.name === '⏩' ||
      reaction.emoji.name === '⏪'
    ), 
    { time: 300000 }).on('collect', (reaction, user) => {
      reaction.users.remove(user.id).catch(() => {});

      if (reaction.emoji.name === '➡️') {
        if (page > pages.length - 1) return;
        mess.edit(pages[page]);
        page++;

      } else if (reaction.emoji.name === '⬅️') {
        if (page - 2 < 0) return;
        mess.edit(pages[page - 2]);
        page--;

      } else if (reaction.emoji.name === '⏩') {
        mess.edit(pages[pages.length - 1])
        page = pages.length;

      } else {
        mess.edit(pages[0]);
        page = 1;
      };
    });
  }, e => {})
};

export const command = new Command(config, run);