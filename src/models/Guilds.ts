import { model, Schema } from "mongoose";
import { client } from "../config/instaceClient";

const guildSchema = new Schema({
  guild_id: {
    type: String,
    required: true,
    immutable: true,
    unique: true
  },
  prefix: {
    type: String,
    required: true,
    maxlength: 10,
    default: client.defaultPrefix
  }
});

const _Guild = model('guilds', guildSchema);

export interface IGuild {
  guild_id: string;
  prefix?: string;
};

export interface IGuildDb<T = any> extends IGuild {
  _id?: T;
  __v?: number;
  prefix: string; 
}

export class Guild extends _Guild {
  constructor(params: IGuild) {
    super(params);
  };
};