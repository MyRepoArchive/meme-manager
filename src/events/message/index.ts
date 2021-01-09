import { Event } from "../../structures/Event";

const event = new Event('discord_client', 'message', (client, message) => {
  const prefix = client.defaultPrefix;
});

export { event };