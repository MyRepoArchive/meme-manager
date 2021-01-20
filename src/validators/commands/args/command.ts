import { ValidatorData } from ".";
import { getCommand } from "../../../functions/getters/command";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function commandArgumentValidator(data: ValidatorData, arg: string) {
    const command = getCommand(arg, data.client);

    if (!command) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

    return command;
};