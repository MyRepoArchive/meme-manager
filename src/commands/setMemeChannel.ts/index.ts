import { Permissions, TextChannel } from 'discord.js';
import { client } from '../../config/instaceClient';
import { sender } from '../../functions/sender';
import { Guild } from '../../models/Guilds';
import { Command, CommandConfig, CommandRun } from '../../structures/Command';
import { EError } from '../../structures/errors/EError';
import { t011, t012, t025 } from '../../utils/texts';

const config: CommandConfig = {
  name: 'setmemechannel',
  aliases: ['setchannelmeme', 'registermemechannel', 'smc'],
  created_timestamp: 1610793950948,
  updated_timestamp: 1611057130983,
  version: '1.0',
  args: {
    'meme_channel': {
      position: 0,
      text: 'Canal de memes',
      type: 'textChannel',
      joinSpace: true,
      required: true,
      thisGuild: true
    }
  },
  cooldown: 20000,
  description: {
    'pt-br': 'É o comando utilizado para setar algum canal do servidor como o canal de memes. Esse canal será reconheçido pelo bot e sempre que alguma coisa for enviada neste canal, o bot irá adicionar duas reações: uma de confirmação, para aprovar o meme, e outra de reprovação (apenas reações de administradores serão contadas pelo bot).',
    'en-us': 'It is the command used to set any channel on the server as the memes channel. This channel will be recognized by the bot and whenever something is sent on this channel, the bot will add two reactions: one for confirmation, to approve the meme, and the other for disapproval (only reactions from administrators will be counted by the bot).'
  },
  example: `${client.defaultPrefix}setmemechannel #memes`,
  permissions: {
    member: new Permissions('ADMINISTRATOR')
  },
  releases_notes: {
    '1.0': {
      name: 'Initial',
      created_timestamp: 1610824374088
    }
  },
  type: 'configuration',
  usage: `${client.defaultPrefix}setmemechannel \`<TextChannel>\``
};

const run: CommandRun = async ({ message, guildLang, client }, args) => {
  const memeChannel = args!.meme_channel as TextChannel;

  Guild.updateOne(
    { guild_id: message.guild!.id }, 
    { memes_channel: memeChannel.id }, 
    { new: true, useFindAndModify: false }
  ).then(() => {
    sender(message, t012(memeChannel, guildLang), 'cd').catch(() => message.react('✅').catch(() => {}));
  }, (e) => {
    sender(message, t011(guildLang), 'cd').catch(() => message.react('❌').catch(() => {}));

    throw new EError(t025(), {
      error: e,
      message,
      memeChannel
    }, { important: true, client });
  });
}

export const command = new Command(config, run);