import { Server as HttpServer } from 'http';
import express, { Express } from 'express';
import socketIo, { Server as SocketIo } from 'socket.io';
import { initHttp } from './http';
import { initWs } from './ws';

class App {
  private httpServer: HttpServer;
  private expressApp: Express;
  private socketApp: SocketIo;
  constructor() {
    this.expressApp = express();
    initHttp(this.expressApp);
    this.httpServer = new HttpServer(this.expressApp);
    this.socketApp = socketIo(this.httpServer);
    initWs(this.socketApp);
  }

  public listen(port: number, listener: () => void) {
    this.httpServer.listen(port, listener);
  }
}

const createApp = () => {
  return new App();
};

export default createApp;
