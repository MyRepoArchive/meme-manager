import dayjs from 'dayjs';
import { Message, MessageEmbed } from 'discord.js';
import { sender } from '../../../functions/sender';
import { Command } from '../../../structures/Command';
import { Langs } from '../../../structures/NewClient';
import { t028, t029, t030, t031, t032, t033, t034, t035 } from '../../../utils/texts';

export default async function showCommandDetails(command: Command, guildLang: Langs, message: Message) {
  const creationDate = `${dayjs(command.created_timestamp).format('LLL')} (${dayjs(command.created_timestamp).fromNow()})`;
  const lastUpdateDate = `${dayjs(command.updated_timestamp).format('LLL')} (${dayjs(command.updated_timestamp).fromNow()})`;

  const embed = new MessageEmbed({
    title: `**${command.name}** ${command.aliases.length ? ('(' + command.aliases.join(', ') + ')') : ''}`,
    fields: [
      { name: t028(guildLang), value: command.type },
      { name: t029(guildLang), value: t030(command, guildLang) },
      { name: t031(guildLang), value: command.active ? t032(guildLang) : t033(command, guildLang) },
      { name: t034(guildLang), value: t035(creationDate, lastUpdateDate, guildLang) },
    ],
    color: message.member!.displayHexColor
  });

  command.description ? embed.setDescription(command.description[guildLang]) : null;
  
  sender(message, embed, 'cr');
};