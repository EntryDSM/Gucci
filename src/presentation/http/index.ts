import { Express } from 'express';
import { Db } from 'mongodb';
import cors from 'cors';
import { json } from 'body-parser';
import { Auth } from './auth';
import { errorHandler } from './errorHandler';
import { Chat } from './chat';

export const initHttpRouters = (app: Express, db: Db) => {
  app.use(cors());
  app.use(json());

  const auth = new Auth(db);
  const chat = new Chat(db);
  app.use(auth.getRouter());
  app.use(chat.getRouter());

  app.use(errorHandler);
};
