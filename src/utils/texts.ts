import { EventInstance, EventName } from "../structures/Event";
import { Langs, NewClient } from "../structures/NewClient";
import { client } from "../config/instaceClient";
import { Message } from "discord.js";

/* Inicios de funcoes e seus significados; */
// t: Textos que vão para terminal!
// c: Textos que vão para o chat!
// em: Mensagens de erro!
// dm: Mensagens que irao para a DM de um usuário/membro!

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
  };
};

export function t005(commandName: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `> Command ${commandName} loaded successfully!`;
    case 'pt-br':
      return `> Comando ${commandName} carregado com sucesso!`;
  };
};

export function t006(commandName: string, erro: any, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `> There was an error executing the ${commandName} command: ${erro}`;
    case 'pt-br':
      return `> Houve um erro ao executar o comando ${commandName}: ${erro}`;
  };
};

export function c001(clientPermissionsStringified: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `I don't have the necessary permissions: ${clientPermissionsStringified}`;
    case 'pt-br':
      return `Não tenho as permissões necessárias: ${clientPermissionsStringified}`;
  };
};

export function c002(memberPermissionsStringified: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `You don't have the necessary permissions: ${memberPermissionsStringified}`;
    case 'pt-br':
      return `Você não tem as permissões necessárias: ${memberPermissionsStringified}`;
  };
};

export function c003(botPing: number, client: NewClient, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Ping from ${botPing}ms bot, ${Math.round(client.ws.ping)}ms in API`;
    case 'pt-br':
      return `Ping do bot de ${botPing}ms, da API de ${Math.round(client.ws.ping)}ms`;
  };
};

export function em001(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Error trying to send a message!`;
    case 'pt-br':
      return `Erro ao tentar enviar uma mensagem!`;
  };
};

export function em002(messageContent: string, argName: string, argText: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument not found!\n\`\`\`\n${messageContent} <${argName}>: ${argText}\n\`\`\``;
    case 'pt-br':
      return `Argumento não encontrado!\n\`\`\`\n${messageContent} <${argName}>: ${argText}\n\`\`\``;
  };
};

export function dm001(errorName: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `The process ran into a: \`${errorName}\`!`;
    case 'pt-br':
      return `O processo se deparou com um: \`${errorName}\`!`;
  };
};