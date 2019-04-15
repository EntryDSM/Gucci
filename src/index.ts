import app from './app';
import { port } from './config';

const server = app();

server.listen(port, () => {
  console.log(`listening on port:${port}`);
});
