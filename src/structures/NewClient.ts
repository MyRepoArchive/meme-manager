import { Client, Collection } from 'discord.js';

export type Langs = 'pt-br' | 'en-us';

export class NewClient extends Client {
  commands = new Collection();
  lang: Langs;

  constructor(lang: Langs = 'pt-br') {
    super()
    this.lang = lang;
  };
};