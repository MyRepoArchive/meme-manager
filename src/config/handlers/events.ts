import { readdirSync } from "fs";
import { AllEvents, Event, EventInstance, EventName } from "../../structures/Event";
import { NewClient } from "../../structures/NewClient";
import { t001 } from "../../utils/texts";

export function eventHandler(client: NewClient) {
  readdirSync('./src/events')
    .forEach(async (eventFolder) => {
      const { event } = await import(`../../events/${eventFolder}`) as { event: Event<EventInstance, EventName<EventInstance>> };

      loadEvent(eventFolder, client, event.instance);
    });
};

export async function loadEvent<I extends EventInstance>(eventFolder: string, client: NewClient, instanceName: I) {
  const localEvent = (await import(`../../events/${eventFolder}`)).event as Event<I, EventName<I>>

  const instances = {
    'discord_client': client,
    'node_process': process
  };

  //@ts-ignore
  (instances[instanceName]).on(localEvent.name, (...params: AllEvents[I][EventName<I>]) => localEvent.run(client, ...params));

  if (instanceName === 'discord_client') {
    client.events.set(localEvent.name as EventName<'discord_client'>, localEvent as unknown as Event<'discord_client', EventName<'discord_client'>>);
  };

  console.log(t001(localEvent.instance, localEvent.name));
};