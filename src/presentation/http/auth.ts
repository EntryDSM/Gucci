import { Router } from 'express';
import { Db } from 'mongodb';
import jsonwebtoken from 'jsonwebtoken';
import { InmemoryUserRepository } from '../../repositories/UserRepository';
import User from '../../entities/User';
import { createUser, verifyUser } from '../../services';
import { jwtSecretKey } from '../../config';

export class Auth {
  private router: Router;
  private userRepository: InmemoryUserRepository;

  constructor(private db: Db) {
    this.router = Router();

    this.userRepository = new InmemoryUserRepository(this.db, 'users');

    this.router.post('/register', async (req, res) => {
      const user: User = req.body;

      await createUser(this.userRepository, user);

      res.status(201).end();
    });
  }

  getRouter() {
    return this.router;
  }
}
