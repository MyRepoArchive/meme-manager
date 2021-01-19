import { Permissions } from "discord.js";
import { client } from "../../config/instaceClient";
import { sender } from "../../functions/sender";
import { Guild } from "../../models/Guilds";
import { Command, CommandConfig, CommandRun } from "../../structures/Command";
import { EError } from "../../structures/errors/EError";
import { t038, t039, t040 } from "../../utils/texts";

const config: CommandConfig = {
  name: 'setprefix',
  created_timestamp: 1611057130983,
  updated_timestamp: 1611057130983,
  version: '1.0',
  aliases: 'sp',
  cooldown: 20000,
  args: {
    'newPrefix': {
       position: 0,
       text: 'Novo prefixo do servidor',
       type: 'string',
       joinSpace: true,
       maxLength: 10,
       required: true
    }
  },
  description: {
    "en-us": `Set a new prefix on the server where the command is used!`,
    "pt-br": `Seta um novo prefixo no servidor em que o comando é usado!`
  },
  example: `${client.defaultPrefix}setprefix !`,
  permissions: {
    member: new Permissions('MANAGE_GUILD')
  },
  releases_notes: {
    '1.0': {
      name: 'Initial',
      created_timestamp: 1611057130983
    }
  },
  type: "configuration",
  usage: `${client.defaultPrefix}setprefix <newPrefix>`
};

const run: CommandRun = ({ prefix, message, guildLang, client }, args) => {
  const newPrefix = args!.newPrefix as string;

  if (prefix === newPrefix) return message.channel.send(t038(newPrefix)).catch(() => message.react('✅').catch(() => {}));

  Guild.updateOne({ guild_id: message.guild!.id }, { prefix: newPrefix }).then(() => {
    message.channel.send(t038(newPrefix)).catch(() => message.react('✅').catch(() => {}));
  }, e => {
    sender(message, t039(guildLang), 'cd').catch(() => message.react('❌').catch(() => {}));

    throw new EError(t040(), {
      error: e,
      message,
      newPrefix
    }, { important: true, client });
  });
};

export const command = new Command(config, run);