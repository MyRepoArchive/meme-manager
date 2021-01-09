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

const guild = model('guilds', guildSchema);

const guild33 = new guild({ guild_id: '33', prefix: '!' });

guild33.save();
guild33.save();
guild33.save();

export { guild };