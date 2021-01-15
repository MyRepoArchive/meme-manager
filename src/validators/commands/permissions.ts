import { Message } from "discord.js";
import { client } from "../../config/instaceClient";
import { getGuildLang } from "../../functions/getters/guildLang";
import { Guild, IGuildDb } from "../../models/Guilds";
import { CommandPermissions } from "../../structures/Command";
import { EError } from "../../structures/errors/EError";
import { c001, c002 } from "../../utils/texts";

export async function validatePermissions(permissions: CommandPermissions, message: Message) {
  if (!permissions) return;

  const clientPermissionsStringified = Object.entries(permissions.client.serialize().ADMINISTRATOR ? { ADMINISTRATOR: true } : permissions.client.serialize())
    .filter(permission => permission[1])
    .map(permission => `\`${permission[0]}\``).join(', ');
  const memberPermissionsStringified = Object.entries(permissions.member.serialize().ADMINISTRATOR ? { ADMINISTRATOR: true } : permissions.member.serialize())
    .filter(permission => permission[1])
    .map(permission => `\`${permission[0]}\``).join(', ');

  const mePermissions = message.guild!.me!.hasPermission(permissions.client);
  const memberPermissions = message.member!.hasPermission(permissions.member);

  if (!mePermissions) throw new EError(c001(clientPermissionsStringified, await getGuildLang(message.guild!.id)), null, { important: false, log: false });
  if (!memberPermissions) throw new EError(c002(memberPermissionsStringified, await getGuildLang(message.guild!.id)), null, { important: false, log: false });
};