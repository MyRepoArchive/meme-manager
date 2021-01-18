import { client } from "../../config/instaceClient";
import { CommandConfig, CommandRun, Command } from "../../structures/Command";

const config: CommandConfig = {
  name: 'help',
  aliases: ['ajuda'],
  created_timestamp: 1610986440154,
  updated_timestamp: 1610986440154,
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
    "en-us": `Shows a command list, separated by types or displays details for a single command.`,
    "pt-br": `Mostra uma lista de comando, separada por tipos ou exibe detalhes de um único comando.`
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

const run: CommandRun = ({ client }, args) => {
  const distinctCategories = [...new Set(client.commands.map(x => x.type))];
  const comando = args?.command as Command | null;

  if (comando) return /* showCommandDetails */
};