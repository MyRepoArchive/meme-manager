import { config } from 'dotenv';
import { connect, connection } from 'mongoose';
import { eventHandler } from './config/handlers/events';
import { guild } from './models/Guilds';
import { NewClient } from './structures/NewClient';
config();

connect('mongodb://localhost/meme-manager', { useNewUrlParser: true, useUnifiedTopology: true });

connection.on('error', (error) => console.error(`Connection error: ${error}`));
connection.on('open', () => console.log(`Banco de dados conectado!`));

guild

const client = new NewClient();

eventHandler(client);

client.login(process.env.TOKEN)