import { Express } from 'express';
import { Db } from 'mongodb';
import { json } from 'body-parser';
import { errorHandler } from './errorHandler';

export const initHttpRouters = (app: Express, db: Db) => {
  app.use(json());

  app.use(errorHandler);
};
