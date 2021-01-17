import { model, Schema } from "mongoose";
import { client } from "../config/instaceClient";
import { Langs } from "../structures/NewClient";

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
  },
  lang: {
    type: String,
    required: true,
    maxlength: 5,
    default: client.lang
  },
  memes_channel: {
    type: String
  }
});

const _Guild = model('guilds', guildSchema);

export interface IGuild {
  guild_id: string;
  prefix?: string;
  lang?: Langs;
  memes_channel?: string;
};

export interface IGuildDb<T = any> extends IGuild {
  _id?: T;
  __v?: number;
  guild_id: string;
  prefix: string; 
  lang: Langs;
  memes_channel?: string;
}

export class Guild extends _Guild {
  constructor(params: IGuild) {
    super(params);
  };
};