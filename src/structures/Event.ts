import { ClientEvents } from "discord.js";
import { NewClient } from "./NewClient";

export interface ProcessEvents {
  beforeExit: [number];
  exit: [number];
  rejectionHandled: [Promise<any>];
  uncaughtException: [Error];
  uncaughtExceptionMonitor: [Error];
  unhandledRejection: [{} | null | undefined, Promise<any>];
  warning: [Error];
  multipleResolves: [NodeJS.MultipleResolveType, Promise<any>, any];
};

export interface AllEvents {
  discord_client:  ClientEvents;
  node_process: ProcessEvents;
};

export type EventInstance = keyof AllEvents;
export type EventName<K extends EventInstance> = K extends 'discord_client' ? keyof ClientEvents : keyof ProcessEvents;
//@ts-ignore
export type EventRun<K extends EventInstance, E extends EventName<K>> = (client: NewClient, ...params: AllEvents[K][E]) => void;

export class Event<K extends EventInstance, E extends EventName<K>> {
  instance: K;
  name: E;
  run: EventRun<K, E>;

  constructor(instance: K, name: E, run: EventRun<K, E>) {
    this.name = name
    this.instance = instance;
    this.run = run;
  };
};