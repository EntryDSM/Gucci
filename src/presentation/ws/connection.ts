import { Socket } from 'socket.io';

const listener = (socket: Socket) => {
  console.log('a user connected', socket.id);
};

export default listener;
