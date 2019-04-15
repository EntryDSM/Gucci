import { Express } from 'express';
import hello from './hello';

export const initHttp = (app: Express) => {
  app.use(hello);
};
