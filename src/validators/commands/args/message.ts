import { ValidatorData } from ".";
import { getMessage } from "../../../functions/getters/message";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function messageArgumentValidator(data: ValidatorData, arg: string) {
    const message = await getMessage(data.message.channel, arg, data.caseInsensitive);

    if (!message) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

    return message;
};