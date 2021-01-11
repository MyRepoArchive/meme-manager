import { model, Schema } from "mongoose";

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
    maxlength: 10
  }
});

const Guild = model('guilds', guildSchema);

export { Guild };