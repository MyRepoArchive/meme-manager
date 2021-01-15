import { APIMessage, DMChannel, GuildMember, MessageAdditions, NewsChannel, StringResolvable, TextChannel, User, MessageOptions } from "discord.js";

export async function trySend(channel: TextChannel | NewsChannel | DMChannel | GuildMember | User, params?: {
    content?: StringResolvable | APIMessage, 
    options?: MessageOptions | MessageAdditions, 
    secondChannel?: TextChannel | NewsChannel | DMChannel | GuildMember | User
  }) {
  if (params?.secondChannel) {
    return channel.send(params.content, params.options as MessageOptions).catch(() => {
      return params.secondChannel!.send(params.content, params.options as MessageOptions);
    });
  } else {
    return channel.send(params?.content, params?.options as MessageOptions);
  };
};
