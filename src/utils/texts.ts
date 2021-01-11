import { EventInstance, EventName } from "../structures/Event";
import { Langs, NewClient } from "../structures/NewClient";
import { client } from "../config/instaceClient";

/* Inicios de funcoes e seus significados; */
// t: Textos que vão para terminal!

export function t001(eventInstance: EventInstance, eventName: EventName<EventInstance>, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `> ${eventName} event loaded successfully! (${eventInstance})`;
    case 'pt-br':
      return `> Evento ${eventName} carregado com sucesso! (${eventInstance})`;
  };
};

export function t002(lang: Langs = client.lang, discordClient: NewClient = client) {
  switch (lang) {
    case 'en-us':
      return `> Bot ${discordClient.user?.tag} starting at ${(process.uptime () - (discordClient.uptime! / 1000)).toFixed (0)}s, with ${discordClient.users.cache.size} users, ${discordClient.guilds.cache.size} guilds, ${discordClient.channels.cache.size} channels, ${discordClient.emojis.cache.size} emojis, ${discordClient.events.size} registered listeners, ${discordClient.commands.size} commands and ${Math.round(discordClient.ws.ping)}ms ping on the API.`;
    case 'pt-br':
      return `> Bot ${discordClient.user?.tag} iniciado em ${(process.uptime() - (discordClient.uptime! / 1000)).toFixed(0)}s, com ${discordClient.users.cache.size} usuários, ${discordClient.guilds.cache.size} guildas, ${discordClient.channels.cache.size} canais, ${discordClient.emojis.cache.size} emojis, ${discordClient.events.size} eventos cadastrados, ${discordClient.commands.size} comandos e ${Math.round(discordClient.ws.ping)}ms de ping na API.`;
  };
};

export function t003(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `> Database connected!`;
    case 'pt-br':
      return `> Banco de dados conectado!`;
  };
};

export function t004(error: any, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `> Connection failed with the database: ${error}`;
    case 'pt-br':
      return `> Conexão falha com o banco de dados: ${error}`;
  }
}