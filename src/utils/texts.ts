import { EventInstance, EventName } from "../structures/Event";
import { Langs, NewClient } from "../structures/NewClient";
import { client } from "../config/instaceClient";
import { Message, TextChannel } from "discord.js";
import { Command, CommandArgsTypes } from "../structures/Command";
import ms from "ms";

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

export function t007(clientPermissionsStringified: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `I don't have the necessary permissions: ${clientPermissionsStringified}`;
    case 'pt-br':
      return `Não tenho as permissões necessárias: ${clientPermissionsStringified}`;
  };
};

export function t008(memberPermissionsStringified: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `You don't have the necessary permissions: ${memberPermissionsStringified}`;
    case 'pt-br':
      return `Você não tem as permissões necessárias: ${memberPermissionsStringified}`;
  };
};

export function t009(botPing: number, client: NewClient, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Ping from ${botPing}ms bot, ${Math.round(client.ws.ping)}ms in API`;
    case 'pt-br':
      return `Ping do bot de ${botPing}ms, da API de ${Math.round(client.ws.ping)}ms`;
  };
};

export function t010(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Ping?`;
    case 'pt-br':
      return `Ping?`;
  };
};

export function t011(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `There was an error setting the memes channel in the database! Try again later!`;
    case 'pt-br':
      return `Houve um erro ao setar o canal de memes no banco de dados! Tente novamente mais tarde!`;
  };
};

export function t012(memeChannel: TextChannel, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `The channel ${memeChannel} has been successfully set as a meme channel!`;
    case 'pt-br':
      return `O canal ${memeChannel} foi setado com sucesso como canal de memes!`;
  };
};

export function t013(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Error trying to send a message!`;
    case 'pt-br':
      return `Erro ao tentar enviar uma mensagem!`;
  };
};

export function t014(messageContent: string, argName: string, argText: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument not found!\n\`\`\`\n${messageContent} <${argName}>: ${argText}\n\`\`\``;
    case 'pt-br':
      return `Argumento não encontrado!\n\`\`\`\n${messageContent} <${argName}>: ${argText}\n\`\`\``;
  };
};

export function t015(argumentIndex: number | string, minCharacters: number, errorLength: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument (\`${argumentIndex}\`) is less than the minimum size (\`${minCharacters}\`)\n${errorLength}`;
    case 'pt-br':
      return `Argumento (\`${argumentIndex}\`) é menor que o tamanho minimo (\`${minCharacters}\`)\n${errorLength}`;
  };
};

export function t016(type: keyof CommandArgsTypes, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `_A value of type \`${type}\` is expected_`;
    case 'pt-br':
      return `_Espera-se um valor de tipo \`${type}\`_`
  };
};

export function t017(argumentIndex: number | string, maxCharacters: number, errorLength: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument(\`${argumentIndex}\`) is greater than the maximum size (\`${maxCharacters}\`)\n${errorLength}`;
    case 'pt-br':
      return `Argumento (\`${argumentIndex}\`) é maior que o tamanho máximo (\`${maxCharacters}\`)\n${errorLength}`;
  };
};

export function t018(argumentIndex: number | string, lengthCharacters: number, errorLength: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument (\`${argumentIndex}\`) is not equal to the desired size (\`${lengthCharacters}\`)\n${errorLength}`;
    case 'pt-br':
      return `Argumento (\`${argumentIndex}\`) não é igual ao tamanho desejado (\`${lengthCharacters}\`)\n${errorLength}`;
  };
};

export function t019(argumentIndex: number | string, notFound: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument (\`${argumentIndex}\`) not identified!\n${notFound}`;
    case 'pt-br':
      return `Argumento (\`${argumentIndex}\`) não identificado!\n${notFound}`;
  };
};

export function t020(argumentIndex: number | string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument (\`${argumentIndex}\`) must be of type \`number\`!`;
    case 'pt-br':
      return `Argumento (\`${argumentIndex}\`) precisa ser do tipo \`número\`!`
  };
};

export function t021(argumentIndex: number | string, max: number, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument (\`${argumentIndex}\`) is greater than the maximum (\`${max}\`)!`;
    case 'pt-br':
      return `Argumento (\`${argumentIndex}\`) é maior que o máximo (\`${max}\`)!`;
  };
};

export function t022(argumentIndex: number | string, min: number, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Argument (\`${argumentIndex}\`) is less than the minimum (\`${min}\`)!`;
    case 'pt-br':
      return `Argumento (\`${argumentIndex}\`) é menor que o mínimo (\`${min}\`)!`;
  };
};

export function t023(waitingTime: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `You are trying to use this command many times in a row, wait **${waitingTime}**!`;
    case 'pt-br':
      return `Você está tentando usar este comando muitas vezes seguidas, aguarde **${waitingTime}**!`
  };
};

export function t024(errorName: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `The process ran into a: \`${errorName}\`!`;
    case 'pt-br':
      return `O processo se deparou com um: \`${errorName}\`!`;
  };
};

export function t025(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `There was an error setting a new meme channel!`;
    case 'pt-br':
      return `Houve um erro ao setar um novo canal de memes!`;
  };
};

export function t026(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `This command does not exist!`;
    case 'pt-br':
      return `Este comando não existe!`;
  };
};

export function t027(client: NewClient, prefix: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Hi, I'm **${client.user!.username}**, if you need any help, my prefix is ​​\`${prefix}\`!`;
    case 'pt-br':
      return `Olá, sou o **${client.user!.username}**, se precisar de alguma ajuda, meu prefixo é \`${prefix}\`!`;
  };
};

export function t028(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Type`;
    case 'pt-br':
      return `Tipo`;
  };
};

export function t029(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Cooldown`;
    case 'pt-br':
      return `Cooldown`;
  };
};

export function t030(command: Command, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `**${ms(command.cooldown)}** up to **${command.usage_limit}** in a row`;
    case 'pt-br':
      return `**${ms(command.cooldown)}** com até **${command.usage_limit}** vezes seguidas`;
  };
};

export function t031(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Status`;
    case 'pt-br':
      return `Status`;
  };
};

export function t032(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `✅ Active`;
    case 'pt-br':
      return `✅ Ativo`;
  };
};

export function t033(command: Command, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `❌ Inactive\n> ${command.reason_inactivity || 'NO REASON REPORTED'}`;
    case 'pt-br':
      return `❌ Inativo\n> ${command.reason_inactivity || 'SEM MOTIVO INFORMADO'}`;
  };
};

export function t034(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `Dates`;
    case 'pt-br':
      return `Datas`;
  };
};

export function t035(creationDate: string, lastUpdateDate: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `> Created at: ${creationDate}\n> Last updated: ${lastUpdateDate}`;
    case 'pt-br':
      return `> Criado em: ${creationDate}\n> Ultima atualização: ${lastUpdateDate}`;
  };
};

export function t036(prefix: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `You can also use ${prefix} help <command> to display detailed information about a command!`;
    case 'pt-br':
      return `Você também pode usar ${prefix}help <command> para exibir informações detalhadas de um comando!`;
  };
};

export function t037(command: Command, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `The command ${command.name} is currently inactive!\n${command.reason_inactivity ? `Reason: \`${command.reason_inactivity}\`` : ''}`;
    case 'pt-br':
      return `O comando ${command.name} está inativo no momento!\n${command.reason_inactivity ? `Motivo: \`${command.reason_inactivity}\`` : ''}`;
  };
};

export function t038(newPrefix: string, lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `New prefix set on the server: \`${newPrefix}\``;
    case 'pt-br':
      return `Novo prefixo setado no servidor: \`${newPrefix}\``;
  };
};

export function t039(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `There was an error when setting a new prefix, try again later!`;
    case 'pt-br':
      return `Houve um erro ao setar um novo prefixo, tente novamente mais tarde!`;
  };
};

export function t040(lang: Langs = client.lang) {
  switch (lang) {
    case 'en-us':
      return `There was an error when setting a new prefix on a server!`;
    case 'pt-br':
      return `Houve um erro ao setar um novo prefixo em um servidor!`;
  };
};