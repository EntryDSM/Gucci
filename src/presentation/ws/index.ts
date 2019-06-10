import { Server } from 'socket.io';
import { Db } from 'mongodb';
import { connect } from './connect';
import { ChatMapper } from '../../database/mapper/chat';

export const initWsEventListeners = (io: Server, db: Db) => {
  const chatMapper = new ChatMapper(db);

  io.on('connection', socket => {
    connect(
      socket,
      socket.request.user.logged_in,
      io,
      chatMapper,
    );
  });
};
