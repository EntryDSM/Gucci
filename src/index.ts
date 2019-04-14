import { Server } from 'http';
import app from './app';
import { create } from './ws/socket';

const server = new Server(app);
create(server);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
