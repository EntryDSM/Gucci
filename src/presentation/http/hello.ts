import { Router } from 'express';

const routerHello = Router();

routerHello.get('/', (req, res) => {
  res.send('hello!');
});

export { routerHello };
