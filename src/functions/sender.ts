import { APIMessage, APIMessageContentResolvable, Message, MessageAdditions, MessageOptions, SplitOptions, StringResolvable } from "discord.js";

export type senderMethod = 
  | 'cr' // Tries to send the message in the chat, if you can't add a reaction
  | 'cd' // Try to send the message in the chat, if you can't try the DM
  | 'cdr' // Try to send the message in the chat, if you can't try the DM, if you can't yet, add a reaction
  | 'dr' // Try to send the message on the DM, if you can't, add a reaction
  | 'dc' // Try to send the message in the DM, if you can't, send it in the chat
  | 'dcr'; // Try to send the message in the DM, if you can't, send it in the chat, if you still can't, add a reaction

export async function sender(
  message: Message,
  content: StringResolvable | APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions,
  method: senderMethod,
  options?: 
    | (MessageOptions & { split: true | SplitOptions })
    | MessageOptions 
    | APIMessage
    | (MessageOptions & { split?: false }) 
    | MessageAdditions
    | (MessageOptions & { split: true | SplitOptions })
) 
{
  const mOptions = options as MessageOptions;

  switch (method) {
    case 'cr':
      return message.channel.send(content, mOptions).catch(() => {
        return (message.react('🤖') && message.react('🚫'));
      });

    case 'cd':
      return message.channel.send(content, mOptions).catch(() => {
        return message.author.send(content, mOptions);
      });

    case 'cdr':
      return message.channel.send(content, mOptions).catch(() => {
        return message.author.send(content, mOptions).catch(() => {
          return (message.react('🤖') && message.react('🚫'));
        });
      });

    case 'dr':
      return message.author.send(content, mOptions).catch(() => {
        return (message.react('🤖') && message.react('🚫'));
      });

    case 'dc':
      return message.author.send(content, mOptions).catch(() => {
        return message.channel.send(content, mOptions);
      });

    case 'dcr':
      return message.author.send(content, mOptions).catch(() => {
        return message.channel.send(content, mOptions).catch(() => {
          return (message.react('🤖') && message.react('🚫'));
        });
      });
  };
};