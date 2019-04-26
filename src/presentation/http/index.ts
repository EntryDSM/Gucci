import express, { Express } from 'express';
import { Auth } from './auth';
import { Db } from 'mongodb';

export const initHttpRouters = async (app: Express, db: Db) => {
  const auth = new Auth(db);

  app.use(express.json());
  app.use(auth.getRouter());
};
