import { Event } from "../../structures/Event";
import { t002 } from "../../utils/texts";

export const event = new Event('discord_client', 'ready', (client) => {
  console.log(t002(client.lang, client));
});