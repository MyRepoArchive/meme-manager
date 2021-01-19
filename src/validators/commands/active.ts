import { Command } from "../../structures/Command";
import { EError } from "../../structures/errors/EError";
import { Langs } from "../../structures/NewClient";
import { t037 } from "../../utils/texts";

export async function validateActive(command: Command, guildLang: Langs) {
  if (command.active) return;

  throw new EError(t037(command, guildLang), null, { log: false });
};