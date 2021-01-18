import { Message } from "discord.js";
import ms from "ms";
import { Command } from "../../structures/Command";
import { EError } from "../../structures/errors/EError";
import { Langs, NewClient } from "../../structures/NewClient";
import { t023 } from "../../utils/texts";

export async function validateCooldown(client: NewClient, command: Command, message: Message, guildLang: Langs) {
  const userId = message.author.id;

  if (client.admins.includes(userId)) return;

  if (!command.cooldowns.has(userId)) command.cooldowns.set(userId, { timestamp: message.createdTimestamp, usage: 1 });

  const timeBetween = message.createdTimestamp - command.cooldowns.get(userId)!.timestamp;
  const waitingTime = ms(command.cooldown - timeBetween);

  if (command.cooldowns.get(userId)!.usage > command.usage_limit) {
    if (timeBetween < command.cooldown) {
      throw new EError(t023(waitingTime, guildLang), null, { log: false });
    } else command.cooldowns.get(userId)!.usage = 0;
  };

  command.cooldowns.get(userId)!.usage ++;
  command.cooldowns.get(userId)!.timestamp = message.createdTimestamp;
};