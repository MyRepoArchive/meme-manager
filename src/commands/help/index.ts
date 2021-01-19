import { MessageEmbed } from "discord.js";
import { client } from "../../config/instaceClient";
import { sender } from "../../functions/sender";
import { CommandConfig, CommandRun, Command } from "../../structures/Command";
import { t036 } from "../../utils/texts";
import showCommandDetails from "./functions/showCommandDetails";

const config: CommandConfig = {
  name: 'help',
  aliases: ['ajuda'],
  created_timestamp: 1610986440154,
  updated_timestamp: 1611057130983,
  version: '1.0',
  args: {
    'command': {
      position: 0,
      text: 'Comando que deseja ver informações',
      type: 'command'
    }
  },
  cooldown: 10000,
  description: {
    "en-us": `Shows a command list, separated by types and displays details for a single command.`,
    "pt-br": `Mostra uma lista de comandos, separada por tipos ou exibe detalhes de um único comando.`
  },
  example: `${client.defaultPrefix}help`,
  releases_notes: {
    '1.0': {
      name: 'Initial',
      created_timestamp: 1610986440154
    }
  },
  usage: `${client.defaultPrefix}help \`<command>\``,
  usage_limit: 2
};

const run: CommandRun = ({ client, guildLang, message, prefix }, args) => {
  const distinctTypes = [...new Set(client.commands.map(x => x.type))];
  const comando = args?.command as Command | null;

  if (comando) return showCommandDetails(comando, guildLang, message);

  const embed = new MessageEmbed({
    color: message.member!.displayHexColor,
    thumbnail: {
      url: client.user?.displayAvatarURL()
    },
    footer: {
      text: t036(prefix, guildLang)
    },
    timestamp: new Date()
  });

  distinctTypes.forEach((type) => {
    const commandsForType = client.commands.filter(cmd => cmd.type === type);

    embed.addField(`${type} (\`${commandsForType.map(x => x).length}\`)`, `\`${commandsForType.map(x => x.name).join('`, `')}\``);
  });

  sender(message, embed, 'cr');
};

export const command = new Command(config, run);