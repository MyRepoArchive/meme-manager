import { Command } from "../../structures/Command";

const command = new Command({
  name: 'ping',
  created_timestamp: Date.now(),
  updated_timestamp: Date.now(),
  version: '1.0'
}, async ({ message, client }) => {
  const msg = await message.channel.send('Ping?');
  msg.edit(`Ping do bot de ${msg.createdTimestamp - message.createdTimestamp}ms, da API de ${Math.round(client.ws.ping)}ms`);
});

export { command };