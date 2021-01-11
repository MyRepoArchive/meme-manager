import { Channel, Collection, DMChannel, Emoji, Guild, GuildMember, Message, NewsChannel, Permissions, Role, StoreChannel, TextChannel, User, VoiceChannel } from "discord.js";
import { client } from "../config/instaceClient";
import { Command as _Command, ICommandDb } from '../models/Commands';
import { Event, EventInstance, EventName } from "./Event";
import { Langs, NewClient } from "./NewClient";

export type CommandTypes = 
  | 'moderation' 
  | 'configuration' 
  | 'general' 
  | 'funny'
  | 'developers'
  | 'administration';

export interface CommandArgsTypes {
  'command': Command;
  'string': string;
  'time': number;
  'number': number;
  'snowflake': GuildMember | Guild | Role | User | Emoji | Message | Channel;
  'member': GuildMember;
  'textChannel': TextChannel;
  'voiceChannel': VoiceChannel;
  'storeChannel': StoreChannel;
  'newsChannel': NewsChannel;
  'dmChannel': DMChannel;
  'role': Role;
  'guild': Guild;
  'emoji': Emoji;
  'event': Event<EventInstance, EventName<EventInstance>>;
  'user': User;
  'message': Message;
};

export type CommandDescription = {
  [key in Langs]: string;
};

export interface CommandReleaseDescription extends CommandDescription {};

export interface CommandConfig {
  name: string;
  aliases?: string[] | string;
  type?: CommandTypes;
  description?: CommandDescription;
  usage?: string;
  example?: string;
  example_image?: string;
  example_video?: string;
  cooldown?: number;
  usage_limit?: number;
  active?: boolean;
  reason_inactivity?: string;
  created_timestamp: number;
  created_at?: Date;
  updated_timestamp: number;
  updated_at?: Date;
  version: string;
  uses?: () => Promise<number>;
  releases_notes?: {
    [key: string]: {
      version?: string;
      name: string;
      description?: CommandReleaseDescription;
      created_timestamp: number;
      created_at?: Date;
    };
  };
  args?: {
    [key: string]: {
      name: string;
      text: string;
      type: keyof CommandArgsTypes;
      position?: number;
      required?: boolean;
      maxLength?: number;
      minLength?: number;
      joinSpace?: boolean;
      length?: number;
      cut?: boolean;
    };
  };
};

export interface CommandRunParams {
  message: Message;
  client: NewClient;
  prefix: string;
  comando: string;
  args: string[];
  permissions: Readonly<Permissions>;
}

export type CommandRun = (params: CommandRunParams) => void;

export class Command {
  name: string;
  aliases: string[];
  type: CommandTypes;
  description: CommandDescription | null;
  usage: string | null;
  example: string | null;
  example_image: string | null;
  example_video: string | null;
  cooldown: number;
  usage_limit: number;
  active: boolean;
  reason_inactivity: string | null;
  created_timestamp: number;
  created_at: Date;
  updated_timestamp: number;
  updated_at: Date;
  version: string;
  releases_notes: Collection<string, {
    version: string, 
    name: string,
    description: CommandReleaseDescription,
    created_timestamp: number,
    created_at: Date
  }> 
  | null;
  args: {
    [key: string]: {
      name: string;
      text: string;
      type: keyof CommandArgsTypes;
      position?: number;
      required?: boolean;
      maxLength?: number;
      minLength?: number;
      joinSpace?: boolean;
      length?: number;
      cut?: boolean;
    };
  } | null;
  params: {
    [key: string]: CommandArgsTypes[keyof CommandArgsTypes]
  } 
  | null;
  run: CommandRun;

  constructor(config: CommandConfig, run: CommandRun) {
    if (!config.aliases) config.aliases = [];
    if (!Array.isArray(config.aliases)) config.aliases = [config.aliases];
    if (config.releases_notes) {
      Object.values(config.releases_notes).forEach((release, index) => {
        release = {
          created_timestamp: release.created_timestamp,
          name: release.name,
          created_at: release.created_at || new Date(release.created_timestamp),
          description: release.description || null as unknown as undefined,
          version: release.version || Object.keys(config.releases_notes!)[index]
        }
      });

      this.releases_notes = new Collection(Object.entries(config.releases_notes) as [string, {
        created_timestamp: number;
        name: string;
        created_at: Date;
        description: CommandReleaseDescription;
        version: string
      }][]);
    } else {
      this.releases_notes = null
    }

    this.name = config.name;
    this.aliases = config.aliases;
    this.type = config.type || 'general';
    this.description = config.description || null;
    this.usage = config.usage || null;
    this.example = config.example || null;
    this.example_image = config.example_image || null;
    this.example_video = config.example_video || null;
    this.cooldown = config.cooldown ?? client.defaultCommandCooldown;
    this.usage_limit = config.usage_limit ?? client.defaultCommandUsageLimit;
    this.active = config.active ?? true;
    this.reason_inactivity = config.reason_inactivity || null;
    this.created_timestamp = config.created_timestamp;
    this.created_at = config.created_at || new Date(config.created_timestamp);
    this.updated_timestamp = config.updated_timestamp;
    this.updated_at = config.updated_at || new Date(config.updated_timestamp);
    this.version = config.version;
    this.args = config.args || null;
    this.params = null;
    this.run = run;

    if (config.uses) this.uses = config.uses;
  };

  async uses() {
    return (await _Command.findOne({ name: this.name }) as ICommandDb | null)?.uses || 0;
  };
};