import { Server as HttpServer } from 'http';
import express, { Express } from 'express';
import socketIo, { Server as SocketIo } from 'socket.io';
import { initHttpRouters } from './presentation/http';
import { initWsEventListeners } from './presentation/ws';

class App {
  private httpServer: HttpServer;
  private expressApp: Express;
  private socketApp: SocketIo;

  constructor() {
    this.expressApp = express();
    this.httpServer = new HttpServer(this.expressApp);
    this.socketApp = socketIo(this.httpServer);

    initHttpRouters(this.expressApp);
    initWsEventListeners(this.socketApp);
  }

  public listen(port: number, listener: () => void) {
    this.httpServer.listen(port, listener);
  }
}

const createApp = () => {
  return new App();
};

export default createApp;
