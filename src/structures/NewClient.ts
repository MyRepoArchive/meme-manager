import { Client, Collection } from 'discord.js';
import { Event, EventName } from './Event';

export type Langs = 'pt-br' | 'en-us';

export class NewClient extends Client {
  commands: Collection<string, unknown> = new Collection();
  events: Collection<EventName<'discord_client'>, Event<'discord_client', EventName<'discord_client'>>> = new Collection();
  defaultPrefix: string;
  lang: Langs;

  constructor(lang: Langs = 'pt-br', defaultPrefix: string = ':') {
    super();
    this.defaultPrefix = defaultPrefix;
    this.lang = lang;
  };
};