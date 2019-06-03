import { Router } from 'express';
import { Db } from 'mongodb';
import jsonwebtoken from 'jsonwebtoken';
import { jwtSecretKey } from '../../config';
import { HttpError } from './error';
import { User } from '../../entities/user';
import { AuthMapper } from '../../database/mapper/auth';

export class Auth {
  private router: Router;
  private authMapper: AuthMapper;

  constructor(private db: Db) {
    this.router = Router();
    this.authMapper = new AuthMapper(db);

    this.router.post('/register', async (req, res, next) => {
      const requestedUser: User = req.body;

      if (await this.authMapper.findByEmail(requestedUser.email)) {
        next(new HttpError(409, 'email already exists'));
      } else {
        try {
          await this.authMapper.register(requestedUser);
        } catch (error) {
          next(new HttpError(500, error.message));
        }

        const token = await jsonwebtoken.sign(requestedUser, jwtSecretKey);
        res.status(201).json(token);
      }
    });

    this.router.post('/login', async (req, res, next) => {
      const requestedUser: User = req.body;

      const user = await this.authMapper.findByEmail(requestedUser.email);

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
