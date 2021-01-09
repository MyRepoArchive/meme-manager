import { EventInstance, EventName } from "../structures/Event";
import { Langs, NewClient } from "../structures/NewClient";

/* Inicios de funcoes e seus significados; */
// t: Textos que vão para terminal!

export function t001(lang: Langs, eventInstance: EventInstance, eventName: EventName<EventInstance>) {
  switch (lang) {
    case 'en-us':
      return `> ${eventName} event loaded successfully! (${eventInstance})`;
    case 'pt-br':
      return `> Evento ${eventName} carregado com sucesso! (${eventInstance})`;
  };
};

export function t002(lang: Langs, client: NewClient) {
  switch (lang) {
    case 'en-us':
      return `> Bot ${client.user?.tag} starting at ${(process.uptime () - (client.uptime! / 1000)).toFixed (0)}s, with ${client.users.cache.size} users, ${client.guilds.cache.size} guilds, ${client.channels.cache.size} channels, ${client.emojis.cache.size} emojis, ${client.events.size} registered listeners, ${client.commands.size} commands and ${Math.round(client.ws.ping)}ms ping on the API.`;
    case 'pt-br':
      return `> Bot ${client.user?.tag} iniciado em ${(process.uptime() - (client.uptime! / 1000)).toFixed(0)}s, com ${client.users.cache.size} usuários, ${client.guilds.cache.size} guildas, ${client.channels.cache.size} canais, ${client.emojis.cache.size} emojis, ${client.events.size} eventos cadastrados, ${client.commands.size} comandos e ${Math.round(client.ws.ping)}ms de ping na API.`;
  };
};