import { ValidatorData } from ".";
import { getMember } from "../../../functions/getters/member";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function memberArgumentValidator(data: ValidatorData, arg: string) {
    const member = data.message.mentions.members?.map(member => member)[data.mentionPosition || 0] 
        || await getMember(data.message.guild!, arg, data.caseInsensitive);

    if (!member) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

    return member;
};