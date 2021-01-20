import { ValidatorData } from ".";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function eventArgumentValidator(data: ValidatorData, arg: string) {
    const event = data.client.events.find(event => {
        return (data.caseInsensitive ? event.name.toLowerCase() : event.name) === (data.caseInsensitive ? arg.toLowerCase() : arg)
    });

    if (!event) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

    return event;
};