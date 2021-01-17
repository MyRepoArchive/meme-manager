import { Message } from "discord.js";
import ms from "ms";
import { getGuildLang } from "../../functions/getters/guildLang";
import { Command } from "../../structures/Command";
import { EError } from "../../structures/errors/EError";
import { NewClient } from "../../structures/NewClient";
import { em011 } from "../../utils/texts";

export async function validateCooldown(client: NewClient, command: Command, message: Message) {
  const userId = message.author.id;

  if (client.admins.includes(userId)) return;

  if (!command.cooldowns.has(userId)) command.cooldowns.set(userId, { timestamp: message.createdTimestamp, usage: 1 });

  const timeBetween = message.createdTimestamp - command.cooldowns.get(userId)!.timestamp;
  const waitingTime = ms(command.cooldown - timeBetween);

  if (command.cooldowns.get(userId)!.usage > command.usage_limit) {
    if (timeBetween < command.cooldown) {
      throw new EError(em011(waitingTime, await getGuildLang(message.guild!.id)), null, { log: false });
    } else command.cooldowns.get(userId)!.usage = 0;
  };

  command.cooldowns.get(userId)!.usage ++;
  command.cooldowns.get(userId)!.timestamp = message.createdTimestamp;
};