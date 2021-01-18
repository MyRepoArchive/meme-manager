import { Snowflake } from "discord.js";
import { writeFileSync } from "fs";
import { client as _client } from "../../config/instaceClient";
import { t024 } from "../../utils/texts";
import { NewClient } from "../NewClient";

export interface EErrorOptions { log?: boolean, important?: boolean, client?: NewClient };

export class EError extends Error {
  date = new Date();
  important: boolean = false;
  erro: {
    name: string;
    message?: string;
    stack?: string;
  };
  args?: any;
  constructor(message?: string, args?: any, { log = true, important = false, client }: EErrorOptions = { log: true, important: false }) {
    super(message);
    this.erro = {
      name: this.name,
      message: this.message,
      stack: this.stack
    };
    this.args = args;

    if (log) this.log();
    if (important) {
      this.important = important;
      this.alert(client);
    };
  };

  stringify(space?: string | number, json?: any) {
    return JSON.stringify(json || this, null, space).replace(/\\n/g, '\n');
  };

  log() {
    _client.errors = _client.errors.slice(0, 100);
    _client.errors.push(this);
    writeFileSync('log.txt', this.stringify(2, _client.errors));
  };

  alert(client: NewClient = _client) {
    client.admins.forEach(admId => {
      notify(admId, this.name);
    });

    async function notify(id: Snowflake, errorName: string) {
      const user = await client.users.fetch(id);

      if (!user) return;

      user.send(t024(errorName)).catch(() => {});
    };
  };
};