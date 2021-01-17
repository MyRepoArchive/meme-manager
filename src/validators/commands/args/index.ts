import { Message } from "discord.js";
import { getGuildLang } from "../../../functions/getters/guildLang";
import { CommandArg, CommandArgs, CommandArgsTypes, CommandProcessedArgs } from "../../../structures/Command";
import { EError } from "../../../structures/errors/EError";
import { ValidateErrorMessages } from "../../../structures/errors/ValidateError";
import { Langs, NewClient } from "../../../structures/NewClient";
import { em002, em003, em004, em005, em006, em007, em008, em009, em010 } from "../../../utils/texts";
import { categoryChannelArgumentValidator } from "./categoryChannel";
import { channelArgumentValidator } from "./channel";
import { commandArgumentValidator } from "./command";
import { emojiArgumentValidator } from "./emoji";
import { eventArgumentValidator } from "./event";
import { guildArgumentValidator } from "./guild";
import { memberArgumentValidator } from "./member";
import { messageArgumentValidator } from "./message";
import { newsChannelArgumentValidator } from "./newsChannel";
import { numberArgumentValidator } from "./number";
import { roleArgumentValidator } from "./role";
import { snowflakeArgumentValidator } from "./snowflake";
import { storeChannelArgumentValidator } from "./storeChannel";
import { stringArgumentValidator } from "./string";
import { textChannelArgumentValidator } from "./textChannel";
import { timeArgumentValidator } from "./time";
import { userArgumentValidator } from "./user";
import { voiceChannelArgumentValidator } from "./voiceChannel";

export interface ValidatorData extends CommandArg {
  key: string;
  index: number;
  args: string[];
  message: Message;
  client: NewClient;
};

export async function validateArgs(args: CommandArgs | null, messageArgs: string[], message: Message, client: NewClient, processed_args: CommandProcessedArgs) {
  if (!args) return;

  processed_args = {};

  const typesValidators: { [key in keyof CommandArgsTypes]: (data: ValidatorData) => Promise<CommandArgsTypes[key]> } = {
    'categoryChannel': categoryChannelArgumentValidator,
    'channel': channelArgumentValidator,
    'command': commandArgumentValidator,
    'emoji': emojiArgumentValidator,
    'event': eventArgumentValidator,
    'guild': guildArgumentValidator,
    'member': memberArgumentValidator,
    'message': messageArgumentValidator,
    'newsChannel': newsChannelArgumentValidator,
    'number': numberArgumentValidator,
    'role': roleArgumentValidator,
    'snowflake': snowflakeArgumentValidator,
    'storeChannel': storeChannelArgumentValidator,
    'string': stringArgumentValidator,
    'textChannel': textChannelArgumentValidator,
    'time': timeArgumentValidator,
    'user': userArgumentValidator,
    'voiceChannel': voiceChannelArgumentValidator
  };

  let index = 0;
  for (const [key, value] of Object.entries(args)) {
    try {
      const data: ValidatorData = { ...value, key, index, args: messageArgs, message, client };
      processed_args[key] = await typesValidators[value.type](data);
    } catch (error) {
      const argumentIndex = value.joinSpace ? `${index + 1}...` : index + 1
      const guildLang = await getGuildLang(message.guild!.id);

      switch (error.message as ValidateErrorMessages) {
        // When the member doesn't provide a valid argument
        case 'ARGUMENT_NOT_FOUND': throw new EError(em007(argumentIndex, notFound(error.props.arg, value.type, guildLang, value.joinSpace), guildLang), null, { log: false });
        case 'GREATER_THAN_MAXIMUM': throw new EError(em009(argumentIndex, error.props.max, guildLang), null, { log: false });
        case 'LESS_THAN_MINIMUM': throw new EError(em010(argumentIndex, error.props.min, guildLang), null, { log: false });
        // When the argument's length is less than the mininum
        case 'LESS_THAN_MIN_LENGTH': throw new EError(em003(argumentIndex, error.props.min, errorLength(error.props.min), guildLang), null, { log: false });
        // When the argument's length is bigger than the maximum
        case 'MAX_LENGTH_EXCEEDED': throw new EError(em005(argumentIndex, error.props.max, errorLength(error.props.max), guildLang), null, { log: false });
        // When the member doesn't provide an argument
        case 'MISSING_ARGUMENT': throw new EError(em002(message.content.replace(/`/g, '\`'), key, value.text, guildLang), null, { log: false });
        // When the argument must be a number
        case 'NOT_A_NUMBER': throw new EError(em008(argumentIndex, guildLang), null, { log: false });
        // When the argument's length is not equal to the specified
        case 'UNVALID_LENGTH': throw new EError(em006(argumentIndex, error.props.expected, errorLength(error.props.expected), guildLang), null, { log: false });
        // if the error is not evoked by validatorByType#method
        default: {
          console.log(error);
          throw error;
        };
      };
    };
    if (value.joinSpace === true) break;
    index++;
  };

  return processed_args;

  function messageContentSpaceReduced(commandLength: number) {
    const reducerSpace = (acc: any, cur: string, index: number) => {
      if (index >= index) return acc;
      return acc += ' '.repeat(cur.length + 1);
    };

    return `\`\`\`\n${message.content.trim()}\n${' '.repeat(commandLength) + messageArgs.reduce(reducerSpace, '')}`;
  };

  function notFound(arg: string, type: keyof CommandArgsTypes, guildLang: Langs, joinSpace?: boolean) {
    const commandLength = message.content.split(' ')[0].length + 1;
    const joinSpaceLength = message.content.slice(commandLength).length;

    return messageContentSpaceReduced(commandLength) + `${'^'.repeat(joinSpace ? joinSpaceLength : arg.length)}\`\`\`${em004(type, guildLang)}`
  };

  function errorLength(len: number) {
    const commandLength = message.content.split(' ')[0].length + 1;

    return messageContentSpaceReduced(commandLength) + `${'^'.repeat(len)}\`\`\``;
  };
}