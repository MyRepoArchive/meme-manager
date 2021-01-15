import { ValidatorData } from ".";
import { EventName } from "../../../structures/Event";
import { ValidateError } from "../../../structures/errors/ValidateError";

export async function eventArgumentValidator(data: ValidatorData) {
    let arg = data.joinSpace ? data.args.slice(data.position).join(' ') : data.args[data.position];

    if (data.required && !arg) throw new ValidateError('MISSING_ARGUMENT');

    if (!data.required && !arg) return null;

    if (data.length && arg.length !== data.length) throw new ValidateError('UNVALID_LENGTH', { arg, expected: data.length });
    if (data.minLength && arg.length < data.minLength) throw new ValidateError('LESS_THAN_MIN_LENGTH', { arg, min: data.minLength });

    if (data.maxLength && arg.length > data.maxLength) {
        if (data.cut) arg = arg.slice(0, data.maxLength)
        else throw new ValidateError('MAX_LENGTH_EXCEEDED', { arg, max: data.maxLength });
    };

    const event = data.client.events.get(arg as EventName<'discord_client'>);

    if (!event) throw new ValidateError('ARGUMENT_NOT_FOUND', { arg });

    return event;
};