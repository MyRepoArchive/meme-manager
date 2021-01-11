import { model, Schema } from "mongoose";

const commandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  uses: {
    type: Number,
    required: true,
    default: 0
  }
});

const _Command = model('commands', commandSchema);

export interface ICommand {
  name: string;
  uses?: number;
};

export interface ICommandDb<T = any> extends ICommand {
  _id?: T;
  __v?: number;
  uses: number;
};

export class Command extends _Command {
  constructor(params: ICommand) {
    super(params);
  };
};