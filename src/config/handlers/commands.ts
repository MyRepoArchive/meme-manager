import { readdirSync } from "fs";
import { Command } from "../../structures/Command";
import { NewClient } from "../../structures/NewClient";
import { t005 } from "../../utils/texts";

export async function commandHandler(client: NewClient) {
  await Promise.all(readdirSync('./src/commands')
    .map(async (commandFolder) => {
      const { command } = await import(`../../commands/${commandFolder}`) as { command: Command };
    
      client.commands.set(command.name, command);
      
      command.aliases.forEach(aliase => {
        client.aliases.set(aliase, command.name);
      });

      console.log(t005(command.name));
    }));
};