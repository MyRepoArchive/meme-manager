import { EError, EErrorOptions } from "./EError";

export type ValidateErrorMessages = 
  | 'MISSING_ARGUMENT'
  | 'LESS_THAN_MIN_LENGTH'
  | 'MAX_LENGTH_EXCEEDED'
  | 'UNVALID_LENGTH'
  | 'GREATER_THAN_MAXIMUM'
  | 'LESS_THAN_MINIMUM'
  | 'ARGUMENT_NOT_FOUND'
  | 'NOT_A_NUMBER';

export class ValidateError extends EError {
  props: any;
  
  constructor(message?: ValidateErrorMessages, props?: any, args?: any, { log = false, important = false, client }: EErrorOptions = { log: false, important: false }) {
    super(message, args, { log, important, client });
    this.name = 'ValidateError';
    this.props = props;
  };
};