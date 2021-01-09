import { readdirSync } from "fs";
import { Event, EventInstance, EventName } from "../../structures/Event";
import { NewClient } from "../../structures/NewClient";
import { t001 } from "../../utils/texts";

export function eventHandler(client: NewClient) {
  readdirSync('./src/events')
  .forEach(async (eventFolder) => {
    const { event } = await import(`../../events/${eventFolder}`) as { event: Event<EventInstance, EventName<EventInstance>> };

    switch (event.instance) {
      case 'discord_client':
        const clientEvent = (await import(`../../events/${eventFolder}`)).event as Event<'discord_client', EventName<'discord_client'>>

        client.on(clientEvent.name, (...params) => clientEvent.run(client, ...params));
        client.events.set(clientEvent.name, clientEvent);

        console.log(t001(client.lang, clientEvent.instance, clientEvent.name));
        break;

      case 'node_process':
        const processEvent = (await import(`../../events/${eventFolder}`)).event as Event<'node_process', EventName<'node_process'>>

        process.on(processEvent.name, (...params) => processEvent.run(client, ...params as any));

        console.log(t001(client.lang, processEvent.instance, processEvent.name));
        break;
    };
  });
}