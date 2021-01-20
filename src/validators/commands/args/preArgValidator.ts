import { ValidatorData } from ".";
import { CommandArgsTypes } from "../../../structures/Command";
import { ValidateError } from "../../../structures/errors/ValidateError";
import { categoryChannelArgumentValidator } from "./categoryChannel";
import { channelArgumentValidator } from "./channel";
import { commandArgumentValidator } from "./command";
import { emojiArgumentValidator } from "./emoji";
import { eventArgumentValidator } from "./event";
import { guildArgumentValidator } from "./guild";
import { langArgumentValidator } from "./lang";
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

export async function preArgValidator<T extends keyof CommandArgsTypes>(type: T, data: ValidatorData): Promise<CommandArgsTypes[T]> {
  let arg = data.joinSpace ? data.args.slice(data.position).join(' ') : data.args[data.position];

  if (data.required && !arg) throw new ValidateError('MISSING_ARGUMENT');

  if (!data.required && !arg) return null;

  if (data.caseInsensitive) arg = arg.toLowerCase();

  if (data.length && arg.length !== data.length) throw new ValidateError('UNVALID_LENGTH', { arg, expected: data.length });
  if (data.minLength && arg.length < data.minLength) throw new ValidateError('LESS_THAN_MIN_LENGTH', { arg, min: data.minLength });

  if (data.maxLength && arg.length > data.maxLength) {
    if (data.cut) arg = arg.slice(0, data.maxLength)
    else throw new ValidateError('MAX_LENGTH_EXCEEDED', { arg, max: data.maxLength });
  };

  const typesValidators: { [key in keyof CommandArgsTypes]: (data: ValidatorData, arg: string) => Promise<CommandArgsTypes[key]> } = {
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
    'voiceChannel': voiceChannelArgumentValidator,
    'lang': langArgumentValidator
  };

  //@ts-ignore
  return await typesValidators[type](data, arg);
};