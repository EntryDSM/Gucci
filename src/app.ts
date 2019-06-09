import { Server as HttpServer } from 'http';
import express, { Express } from 'express';
import socketIo, { Server as SocketIo } from 'socket.io';
import { Db } from 'mongodb';
import { connectDb } from './database/connection';
import { initHttpRouters } from './presentation/http';
import { initWsEventListeners } from './presentation/ws';

class App {
  private httpServer: HttpServer;
  private expressApp: Express;
  private socketApp: SocketIo;

  constructor(private db: Db) {
    this.expressApp = express();
    this.httpServer = new HttpServer(this.expressApp);
    this.socketApp = socketIo(this.httpServer);

    initHttpRouters(this.expressApp, this.db);
    initWsEventListeners(this.socketApp, this.db);
  }

  public listen(port: number, listener: () => void) {
    this.httpServer.listen(port, listener);
  }
}

const createApp = async () => {
  return new App(await connectDb());
};

export default createApp;
