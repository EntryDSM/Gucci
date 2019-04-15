import { Server } from 'socket.io';
import connection from './connection';

export const initWs = (io: Server) => {
  io.on('connection', connection);
};
