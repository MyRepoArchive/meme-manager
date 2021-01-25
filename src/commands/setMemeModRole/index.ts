import { Permissions, Role } from "discord.js";
import { client } from "../../config/instaceClient";
import { Command, CommandConfig, CommandRun } from "../../structures/Command";
import { Guild } from '../../models/Guilds';
import { sender } from "../../functions/sender";
import { t044, t045, t046 } from "../../utils/texts";
import { EError } from "../../structures/errors/EError";

const config: CommandConfig = {
  name: 'setmememoderatorrole',
  aliases: ['setmememodrole', 'setmodrole', 'setmoderatorrole', 'smmr'],
  created_timestamp: 1611355955389,
  updated_timestamp: 1611355955389,
  version: '1.0',
  args: {
    'memeModeratorRole': {
      position: 0,
      text: 'O cargo que ganhará permissão para aprovar ou reprovar memes',
      type: 'role',
      caseInsensitive: true,
      joinSpace: true,
      mentionPosition: 0,
      required: true,
      thisGuild: true
    }
  },
  cooldown: 20000,
  description: {
    "en-us": `Putting in office the permission to be able to approve or disapprove memes sent in the memes channel.`,
    "pt-br": `Seta no cargo a permissão de poder aprovar ou reprovar memes enviados no canal de memes.`
  },
  example: `${client.defaultPrefix}setmememoderatorrole @meme-mod`,
  permissions: {
    member: new Permissions('ADMINISTRATOR')
  },
  releases_notes: {
    '1.0': {
      created_timestamp: 1611355955389,
      name: 'Initial'
    }
  },
  type: 'configuration',
  usage: `${client.defaultPrefix}setmememoderatorrole <role>`
};

const run: CommandRun = ({ client, message, guildLang }, args) => {
  const memeRole = args!.memeModeratorRole as Role;

  Guild.updateOne(
    { guild_id: message.guild!.id }, 
    { meme_role: memeRole.id }, 
    { new: true, useFindAndModify: false }
  ).then(() => {
    sender(message, t044(memeRole, guildLang), 'cd').catch(() => message.react('✅').catch(() => {}));
  }, (e) => {
    sender(message, t045(guildLang), 'cd').catch(() => message.react('❌').catch(() => {}));

    throw new EError(t046(), {
      error: e,
      message,
      memeRole
    }, { important: true, client });
  });
};

export const command = new Command(config, run);