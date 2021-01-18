import { Message } from "discord.js";
import { CommandPermissions } from "../../structures/Command";
import { EError } from "../../structures/errors/EError";
import { Langs } from "../../structures/NewClient";
import { t007, t008 } from "../../utils/texts";

export async function validatePermissions(permissions: CommandPermissions, message: Message, guildLang: Langs) {
  if (!permissions) return;

  const clientPermissionsStringified = Object.entries(permissions.client.serialize().ADMINISTRATOR ? { ADMINISTRATOR: true } : permissions.client.serialize())
    .filter(permission => permission[1])
    .map(permission => `\`${permission[0]}\``).join(', ');
  const memberPermissionsStringified = Object.entries(permissions.member.serialize().ADMINISTRATOR ? { ADMINISTRATOR: true } : permissions.member.serialize())
    .filter(permission => permission[1])
    .map(permission => `\`${permission[0]}\``).join(', ');

  const mePermissions = message.guild!.me!.hasPermission(permissions.client);
  const memberPermissions = message.member!.hasPermission(permissions.member);

  if (!mePermissions) throw new EError(t007(clientPermissionsStringified, guildLang), null, { important: false, log: false });
  if (!memberPermissions) throw new EError(t008(memberPermissionsStringified, guildLang), null, { important: false, log: false });
};