import { Client, Collection } from 'discord.js';
import { Command } from './Command';
import { Event, EventName } from './Event';

export type Langs = 'pt-br' | 'en-us';

export class NewClient extends Client {
  commands: Collection<string, Command> = new Collection();
  aliases: Collection<string, string> = new Collection();
  events: Collection<EventName<'discord_client'>, Event<'discord_client', EventName<'discord_client'>>> = new Collection();
  defaultPrefix: string;
  defaultCommandCooldown: number;
  defaultCommandUsageLimit: number
  lang: Langs;

  constructor(lang: Langs = 'en-us', defaultPrefix: string = ':', defaultCommandCooldown: number = 0, defaultCommandUsageLimit: number = 1) {
    super();
    this.defaultPrefix = defaultPrefix;
    this.defaultCommandCooldown = defaultCommandCooldown;
    this.defaultCommandUsageLimit = defaultCommandUsageLimit;
    this.lang = lang;
  };
};