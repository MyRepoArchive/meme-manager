import { Event } from "../../structures/Event";

const event = new Event('discord_client', 'message', (client, message) => {
  console.log(message)
})

export { event }