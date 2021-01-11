import { config } from 'dotenv';
import mongoose from 'mongoose';
import { eventHandler } from './config/handlers/events';
import { client } from './utils/instaceClient';
import { t003, t004 } from './utils/texts';

config();

// Config mongoose
mongoose.connect('mongodb://localhost/meme-manager', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(
    () => console.log(t003()), 
    error => console.error(t004(error))
  );

eventHandler(client);

client.login(process.env.TOKEN);