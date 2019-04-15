import { Express } from 'express';
import hello from './hello';

export const initHttpRouters = (app: Express) => {
  app.use(hello);
};
