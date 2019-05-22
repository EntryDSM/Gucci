import app from './app';
import { PORT } from './config';

const server = app();

server.listen(PORT, () => {
  console.log(`listening on port:${PORT}`);
});
