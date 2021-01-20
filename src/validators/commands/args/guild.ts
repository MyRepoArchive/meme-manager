import { ValidatorData } from ".";
import { getGuild } from "../../../functions/getters/guild";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function guildArgumentValidator(data: ValidatorData, arg: string) {
    const guild = await getGuild(data.client, arg, data.caseInsensitive);

    if (!guild) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

    return guild;
};