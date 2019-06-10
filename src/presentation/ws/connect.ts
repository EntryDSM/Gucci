import { Socket, Server } from 'socket.io';
import { Event } from './events';
import { ChatMapper } from '../../database/mapper/chat';

class AdminSockets {
  private rooms: string[] = [];
  private adminSockets: Socket[] = [];

  get connectedSocketCount(): number {
    return this.adminSockets.length;
  }

  add(socketWillAdd: Socket) {
    if (!this.adminSockets.find(socket => socket === socketWillAdd)) {
      this.adminSockets.push(socketWillAdd);
      this.rooms.forEach(room => {
        socketWillAdd.join(room);
      });
    }
  }

  delete(socketWillDelete: Socket) {
    this.adminSockets = this.adminSockets.filter(socket => {
      socket !== socketWillDelete;
    });
  }

  join(roomWillJoin: string) {
    if (!this.rooms.find(room => room === roomWillJoin)) {
      this.rooms.push(roomWillJoin);

      this.adminSockets.forEach(socket => {
        socket.join(roomWillJoin);
      });
    }
  }
}

const adminSockets = new AdminSockets();

export const connect = (
  socket: Socket,
  isAdmin: boolean,
  io: Server,
  chatMapper: ChatMapper,
) => {
  if (isAdmin) {
    adminSockets.add(socket);
    io.emit(Event.ONLINE_ADMIN_COUNT, adminSockets.connectedSocketCount);

    socket.on(
      Event.SEND_MESSAGE,
      async ({
        writer,
        room,
        content,
        encodedImageData,
      }: {
        writer: string;
        room: string;
        content?: string;
        encodedImageData?: string;
      }) => {
        const message = {
          writer,
          room,
          content,
          encodedImageData,
          sendedAt: Date.now(),
          isAdmin: true,
        };
        const id = await chatMapper.registerMessage(message);

        io.to(room).emit(Event.RECEIVE_MESSAGE, { ...message, _id: id });
      },
    );

    socket.on('disconnect', () => {
      adminSockets.delete(socket);
      io.emit(Event.ONLINE_ADMIN_COUNT, adminSockets.connectedSocketCount);
    });
  } else {
    socket.on(Event.JOIN, ({ room }: { room: string }) => {
      socket.join(room);
      adminSockets.join(room);
    });

    socket.on(
      Event.SEND_MESSAGE,
      async ({
        writer,
        room,
        content,
        encodedImageData,
      }: {
        writer: string;
        room: string;
        content?: string;
        encodedImageData?: string;
      }) => {
        const message = {
          writer,
          room,
          content,
          encodedImageData,
          sendedAt: Date.now(),
          isAdmin: false,
        };
        const id = await chatMapper.registerMessage(message);
        io.to(room).emit(Event.RECEIVE_MESSAGE, { ...message, _id: id });
      },
    );
  }
};
