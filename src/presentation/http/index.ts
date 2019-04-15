import { Express } from 'express';
import { routerHello } from './hello';

export const initHttpRouters = (app: Express) => {
  app.use(routerHello);
};
