import { Server } from 'socket.io';
import { authenticate } from 'socketio-jwt-auth';
import { Db } from 'mongodb';
import { jwtSecretKey } from '../../config';
import { verifyWithDb } from './verify';
import { connect } from './connect';
import { AuthMapper } from '../../database/mapper/auth';
import { ChatMapper } from '../../database/mapper/chat';

export const initWsEventListeners = (io: Server, db: Db) => {
  const authMapper = new AuthMapper(db);
  const chatMapper = new ChatMapper(db);

  io.use(
    authenticate(
      { secret: jwtSecretKey, succeedWithoutToken: true },
      verifyWithDb(authMapper),
    ),
  );

  io.on('connection', socket => {
    connect(
      socket,
      socket.request.user.logged_in,
      io,
      chatMapper,
    );
  });
};
