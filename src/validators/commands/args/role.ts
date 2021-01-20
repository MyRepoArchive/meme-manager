import { ValidatorData } from ".";
import { getRole } from "../../../functions/getters/role";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function roleArgumentValidator(data: ValidatorData, arg: string) {
    const role = data.message.mentions.roles?.map(role => role)[data.mentionPosition || 0] 
        || await getRole(data.message.guild!, arg, data.caseInsensitive);

    if (!role) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

    return role;
};