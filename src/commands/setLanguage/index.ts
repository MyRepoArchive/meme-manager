import { Permissions } from "discord.js";
import { client } from "../../config/instaceClient";
import { sender } from "../../functions/sender";
import { Guild } from "../../models/Guilds";
import { Command, CommandConfig, CommandRun } from "../../structures/Command";
import { EError } from "../../structures/errors/EError";
import { Langs, langsArr } from "../../structures/NewClient";
import { t041, t042, t043 } from "../../utils/texts";

const config: CommandConfig = {
  name: 'setlanguage',
  aliases: 'setlang',
  created_timestamp: 1611063036351,
  updated_timestamp: 1611063036351,
  version: '1.0',
  args: {
    'language': {
      position: 0,
      text: 'New language of server',
      type: 'lang',
      maxLength: 5,
      required: true,
      caseInsensitive: true
    }
  },
  cooldown: 20000,
  description: {
    "en-us": `Set a new language on the server, so all bot responses will be in the language that is selected!\nAvailable languages: ${langsArr.map(x => `\`${x}\``).join (',')}`,
    "pt-br": `Seta no servidor uma nova linguagem, sendo assim todas as respostas do bot serão na linguagem que for selecionada!\nLinguas disponíveis: ${langsArr.map(x => `\`${x}\``).join(', ')}`
  },
  example: `${client.defaultPrefix}setlanguage pt-br`,
  permissions: {
    member: new Permissions('MANAGE_GUILD')
  },
  releases_notes: {
    '1.0': {
      created_timestamp: 1611138275905,
      name: `Initial`
    }
  },
  type: 'configuration',
  usage: `${client.defaultPrefix}setlanguage <lang>`
};

const run: CommandRun = ({ message, guildLang, client }, args) => {
  const newLang = args!.language as Langs;

  if (newLang === guildLang) return message.channel.send(t043(newLang, newLang)).catch(() => message.react('✅').catch(() => {}));

  Guild.updateOne(
    { guild_id: message.guild!.id },
    { lang: newLang },
    { new: true, useFindAndModify: false }
  ).then(() => {
    message.channel.send(t043(newLang, newLang)).catch(() => message.react('✅').catch(() => {}));
  }, e => {
    sender(message, t041(guildLang), 'cd').catch(() => message.react('❌').catch(() => {}));

    throw new EError(t042(), {
      error: e,
      message,
      newLang
    }, { important: true, client });
  });
};

export const command = new Command(config, run);