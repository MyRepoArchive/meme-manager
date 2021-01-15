import { Message } from "discord.js";
import { CommandArg, CommandArgs, CommandArgsTypes, CommandProcessedArgs } from "../../../structures/Command";
import { ValidateErrorMessages } from "../../../structures/errors/ValidateError";
import { NewClient } from "../../../structures/NewClient";
import { em002 } from "../../../utils/texts";
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

      switch (error.message as ValidateErrorMessages) {
        // When the member doesn't provide an argument
        case 'MISSING_ARGUMENT': throw new Error(em002(message.content.replace(/`/g, '\`'), key, value.text));
        // When the argument's length is less than the mininum
        case 'LESS_THAN_MIN_LENGTH': throw new Error(translatedError({ argument_index: argumentIndex, min: error.props.min, error_length: this.errorLength({ position: index, len: error.props.min }) }))
        // When the argument's length is bigger than the maximum
        case 'MAX_LENGTH_EXCEEDED': throw new Error(translatedError({ argument_index: argumentIndex, max: error.props.max, error_length: this.errorLength({ position: index, len: error.props.max }) }))
        // When the argument's length is not equal to the specified
        case 'UNVALID_LENGTH': throw new Error(translatedError({ argument_index: argumentIndex, length: error.props.expected, error_length: this.errorLength({ position: index, len: error.props.expected }) }))
        // When the member doesn't provide a valid argument
        case 'ARGUMENT_NOT_FOUND': throw new Error(translatedError({ argument_index: argumentIndex, not_found: this.notFound({ arg: (error.props || {}).arg, position: index, type: value.type, joinSpace: value.joinSpace }) }))
        // When the argument must be a number
        case 'NOT_A_NUMBER': throw new Error(translatedError({ argument_index: argumentIndex }))
        // if the error is not evoked by validatorByType#method
        default: {
          console.log(error)
          throw error
        }
      }
    }
    if (value.joinSpace === true) break;
    index++
  };

  function messageContentSpaceReduced(commandLength: number) {
    const reducerSpace = (acc: any, cur: string, index: number) => {
      if (index >= index) return acc;
      return acc += ' '.repeat(cur.length + 1);
    };

    return `\`\`\`\n${message.content.trim()}\n${' '.repeat(commandLength) + messageArgs.reduce(reducerSpace, '')}`;
  };

  function notFound(arg: string, type: keyof CommandArgsTypes, joinSpace?: boolean) {
    const commandLength = message.content.split(' ')[0].length + 1;
    const joinSpaceLength = message.content.slice(commandLength).length;

    return messageContentSpaceReduced(commandLength) + `${'^'.repeat(joinSpace ? joinSpaceLength : arg.length)}\`\`\`_Espera-se um valor de tipo **${type}**_`
  };

  function errorLength(len: number) {
    const commandLength = message.content.split(' ')[0].length + 1;

    return messageContentSpaceReduced(commandLength) + `${'^'.repeat(len)}\`\`\``;
  };
}