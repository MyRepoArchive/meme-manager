import { User } from "discord.js";
import { ValidatorData } from ".";
import { getUser } from "../../../functions/getters/user";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function userArgumentValidator(data: ValidatorData, arg: string) {
    const user: User | undefined = data.message.mentions.users?.map(user => user)[data.mentionPosition || 0] 
        || await getUser(arg, data.client, data.caseInsensitive);

    if (!user || (data.thisGuild && !data.message.guild!.member(user))) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

    return user;
};