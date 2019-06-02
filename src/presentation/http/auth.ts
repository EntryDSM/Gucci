import { Router } from 'express';
import { Db, Collection } from 'mongodb';
import jsonwebtoken from 'jsonwebtoken';
import { jwtSecretKey } from '../../config';
import { HttpError } from './error';

interface User {
  email: string;
  username?: string;
  password: string;
}

export class Auth {
  private router: Router;
  private collection: Collection;

  constructor(private db: Db) {
    this.router = Router();
    this.collection = db.collection('users');

    this.router.post('/register', async (req, res, next) => {
      const requestedUser: User = req.body;

      if (await this.collection.findOne<User>({ email: requestedUser.email })) {
        next(new HttpError(409, 'email already exists'));
      } else {
        try {
          await this.collection.insertOne(requestedUser);
        } catch (error) {
          next(new HttpError(500, error.message));
        }

        const token = await jsonwebtoken.sign(requestedUser, jwtSecretKey);
        res.status(201).json(token);
      }
    });

    this.router.post('/login', async (req, res, next) => {
      const requestedUser: User = req.body;

      const user = await this.collection.findOne<User>({
        email: requestedUser.email,
      });

      if (user && user.password === requestedUser.password) {
        const token = await jsonwebtoken.sign(user, jwtSecretKey);
        res.status(200).json(token);
      } else {
        next(new HttpError(401, 'unauthorized email or wrong password'));
      }
    });
  }

  getRouter() {
    return this.router;
  }
}
