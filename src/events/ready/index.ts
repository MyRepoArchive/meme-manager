import { Event } from "../../structures/Event";
import { t002 } from "../../utils/texts";

const event = new Event('discord_client', 'ready', (client) => {
  console.log(t002(client.lang, client));
})

export { event };