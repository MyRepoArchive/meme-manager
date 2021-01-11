import { model, Schema } from "mongoose";
import { client } from "../utils/instaceClient";

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

const Guild = model('guilds', guildSchema);

export { Guild };