import socketIo from 'socket.io';
import { Server } from 'http';

export const create = (server: Server) => {
  const io = socketIo(server);

  io.on('connection', socket => {
    console.log('a user connected', socket.id);
  });
};
