import { Server } from 'socket.io';
import connection from './connection';

export const initWsEventListeners = (io: Server) => {
  io.on('connection', connection);
};
