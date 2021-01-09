import { Client, Collection } from 'discord.js';
import { Event, EventInstance, EventName } from './Event';

export type Langs = 'pt-br' | 'en-us';

export class NewClient extends Client {
  commands: Collection<string, unknown> = new Collection();
  events: Collection<EventName<'discord_client'>, Event<'discord_client', EventName<'discord_client'>>> = new Collection();
  lang: Langs;

  constructor(lang: Langs = 'pt-br') {
    super()
    this.lang = lang;
  };
};