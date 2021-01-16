import { Client, ClientOptions, Collection, GuildChannel, Snowflake } from 'discord.js';
import { Command } from './Command';
import { EError } from './errors/EError';
import { Event, EventName } from './Event';

export type Langs = 'pt-br' | 'en-us';
export interface NewClientConfig {
  lang?: Langs;
  defaultPrefix?: string;
  defaultCommandCooldown?: number;
  defaultCommandUsageLimit?: number;
  admins?: Snowflake[];
};

export class NewClient extends Client {
  commands: Collection<string, Command> = new Collection();
  aliases: Collection<string, string> = new Collection();
  cooldowns: Collection<string, Collection<Snowflake, {
    timestamp: number,
    usage: number
  }>> = new Collection();
  errors: EError[] = [];
  events: Collection<EventName<'discord_client'>, Event<'discord_client', EventName<'discord_client'>>> = new Collection();
  defaultPrefix: string;
  defaultCommandCooldown: number;
  defaultCommandUsageLimit: number;
  lang: Langs;
  admins: Snowflake[]

  constructor(options?: ClientOptions, { 
    lang = 'pt-br', 
    defaultPrefix = '-', 
    defaultCommandCooldown = 0, 
    defaultCommandUsageLimit = 1, 
    admins = ['403925985847934976']
  }: NewClientConfig = { 
    lang: 'pt-br', 
    defaultPrefix: '-', 
    defaultCommandCooldown: 0, 
    defaultCommandUsageLimit: 1, 
    admins: ['403925985847934976']
  }) {
    super(options);
    this.defaultPrefix = defaultPrefix;
    this.defaultCommandCooldown = defaultCommandCooldown;
    this.defaultCommandUsageLimit = defaultCommandUsageLimit;
    this.lang = lang;
    this.admins = admins;
  };

  guildChannels() {
    return this.channels.cache.filter(channel => ['news', 'text', 'voice', 'store', 'category'].includes(channel.type)) as Collection<string, GuildChannel>;
  }
};