import { CategoryChannel, Collection, Emoji, Guild, GuildChannel, GuildMember, Message, NewsChannel, Permissions, Role, Snowflake, StoreChannel, TextChannel, User, VoiceChannel } from "discord.js";
import { client } from "../config/instaceClient";
import { Command as _Command, ICommandDb } from '../models/Commands';
import { validatePermissions } from "../validators/commands/permissions";
import { Event, EventName } from "./Event";
import { Langs, NewClient } from "./NewClient";
import { validateArgs } from "../validators/commands/args";
import { Guild as _Guild } from '../models/Guilds';
import { validateCooldown } from "../validators/commands/cooldown";
import { sender } from "../functions/sender";
import { validateActive } from "../validators/commands/active";

export type CommandTypes = 
  | 'moderation' 
  | 'configuration' 
  | 'general' 
  | 'funny'
  | 'developers'
  | 'administration';

export interface CommandArgsTypes {
  'command': Command | null;
  'string': string | null;
  'time': number | null;
  'number': number | null;
  'snowflake': Snowflake | null;
  'member': GuildMember | null;
  'textChannel': TextChannel | null;
  'voiceChannel': VoiceChannel | null;
  'storeChannel': StoreChannel | null;
  'newsChannel': NewsChannel | null;
  'categoryChannel': CategoryChannel | null;
  'channel': GuildChannel | null;
  'role': Role | null;
  'guild': Guild | null;
  'emoji': Emoji | null;
  'event': Event<'discord_client', EventName<'discord_client'>> | null;
  'user': User | null;
  'message': Message | null;
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
  args?: CommandArgs;
  permissions?: {
    client?: Permissions;
    member?: Permissions;
    both?: Permissions;
  };
};

export interface CommandRunParams {
  message: Message;
  client: NewClient;
  prefix: string;
  comando: string;
  args: string[];
  permissions: Readonly<Permissions>;
  guildLang: Langs
}

export type CommandRun = (params: CommandRunParams, args: CommandProcessedArgs) => void;

export interface CommandRelease {
  version: string, 
  name: string,
  description: CommandReleaseDescription,
  created_timestamp: number,
  created_at: Date
};

export type CommandPermissions = {
  client: Permissions;
  member: Permissions;
} | null;

export interface CommandArg {
  text: string;
  type: keyof CommandArgsTypes;
  position: number;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  joinSpace?: boolean;
  length?: number;
  cut?: boolean;
  thisGuild?: boolean;
  mentionPosition?: number;
};

export type CommandArgs = {
  [key: string]: CommandArg
};

export type CommandProcessedArgs = {
  [key: string]: CommandArgsTypes[keyof CommandArgsTypes]
} | null;

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
  cooldowns: Collection<string, {
    timestamp: number;
    usage: number;
  }> = new Collection();
  active: boolean;
  reason_inactivity: string | null;
  created_timestamp: number;
  created_at: Date;
  updated_timestamp: number;
  updated_at: Date;
  version: string;
  releases_notes: Collection<string, CommandRelease> 
  | null;
  args: CommandArgs | null;
  permissions: CommandPermissions;
  processed_args: CommandProcessedArgs;
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

      this.releases_notes = new Collection(Object.entries(config.releases_notes) as [string, CommandRelease][]);
    } else {
      this.releases_notes = null;
    };

    if (config.permissions) {
      this.permissions = {
        client: config.permissions.client || new Permissions(),
        member: config.permissions.member || new Permissions()
      }; 

      this.permissions.client!.add(config.permissions.both || 0)
      this.permissions.member!.add(config.permissions.both || 0)
    } else {
      this.permissions = null;
    };

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
    this.processed_args = null;
    this.run = run;

    if (config.uses) this.uses = config.uses;
  };

  async uses() {
    return (await _Command.findOne({ name: this.name }) as ICommandDb | null)?.uses || 0;
  };

  async index(params: CommandRunParams) {
    const onThen = () => {
      this.run(params, this.processed_args);
    };

    const onCatch = (error: Error) => {
      sender(params.message, error.message, 'cdr').catch(() => {});
    };

    this.validate(params.message, params.args, params.client, params.guildLang).then(onThen, onCatch);
  };

  async validate(message: Message, args: string[], client: NewClient, guildLang: Langs) {
    await validateActive(this, guildLang);
    await validateCooldown(client, this, message, guildLang);
    await validatePermissions(this.permissions, message, guildLang);
    const processed_args = await validateArgs(this.args, args, message, client, this.processed_args, guildLang);
    this.processed_args = processed_args!;
  };
};