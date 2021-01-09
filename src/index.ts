import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { Event, EventInstance, EventName } from './structures/Event';
import { NewClient } from './structures/NewClient';
import { t001 } from './utils/texts';
config();

const client = new NewClient('pt-br');

readdirSync('./src/events')
  .forEach(async (eventFolder) => {
    const { event } = await import(`./events/${eventFolder}`) as { event: Event<EventInstance, EventName<EventInstance>> };

    switch (event.instance) {
      case 'discord_client':
        //@ts-ignore
        client.on(event.name, (...params) => event.run(client, ...params));
        console.log(t001(client.lang, event.instance, event.name));
        break;
      case 'node_process':
        //@ts-ignore
        process.on(event.name, (...params) => event.run(client, ...params));
        console.log(t001(client.lang, event.instance, event.name));
        break;
    };
  });

client.login(process.env.TOKEN)