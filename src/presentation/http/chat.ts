import { Router } from 'express';
import { Db } from 'mongodb';
import jsonwebtoken from 'jsonwebtoken';
import { jwtSecretKey } from '../../config';
import { HttpError } from './error';
import { ChatMapper } from '../../database/mapper/chat';
import { AuthMapper } from '../../database/mapper/auth';
import { User } from '../../entities/user';

export class Chat {
  private router: Router;
  private authMapper: AuthMapper;
  private chatMapper: ChatMapper;

  constructor(private db: Db) {
    this.router = Router();
    this.authMapper = new AuthMapper(db);
    this.chatMapper = new ChatMapper(db);

    this.router.use(async (req, res, next) => {
      const token = req.headers.authorization;

      if (token) {
        try {
          const decoded = jsonwebtoken.verify(token, jwtSecretKey);

          const requestedUser = <User>decoded;
          const user = await this.authMapper.findByEmail(requestedUser.email);

          if (user) {
            next();
          } else {
            throw Error();
          }
        } catch (error) {
          next(new HttpError(401, 'invalid token'));
        }
      } else {
        next(new HttpError(401, 'unauthorized'));
      }
    });

    this.router.get('/messages', async (req, res, next) => {
      const {
        room,
        startMillisecond: startMillisecondStr,
        limit: limitStr,
      }: {
        room: string;
        startMillisecond?: string;
        limit?: string;
      } = req.query;

      try {
        const startMillisecond = startMillisecondStr
          ? parseInt(startMillisecondStr, 10)
          : Date.now();
        const limit = limitStr ? parseInt(limitStr, 10) : 1;

        const messages = await this.chatMapper.findMessagesByRoom(
          room,
          startMillisecond,
          limit,
        );

        const reversedMessages = messages.reverse();
        res.json(reversedMessages);
      } catch (error) {
        next(new HttpError(400, 'bad request'));
      }
    });

    this.router.get('/message-threads', async (req, res, next) => {
      const {
        startMillisecond: startMillisecondStr,
        limit: limitStr,
      }: {
        startMillisecond?: string;
        limit?: string;
      } = req.query;

      try {
        const startMillisecond = startMillisecondStr
          ? parseInt(startMillisecondStr, 10)
          : Date.now();
        const limit = limitStr ? parseInt(limitStr, 10) : 1;

        const messageThreads = await this.chatMapper.findMessageThreads(
          startMillisecond,
          limit,
        );
        res.json(messageThreads);
      } catch (error) {
        next(new HttpError(400, 'bad request'));
      }
    });
  }

  getRouter() {
    return this.router;
  }
}
