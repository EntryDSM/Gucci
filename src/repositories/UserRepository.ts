import { Db, Collection, InsertOneWriteOpResult } from 'mongodb';
import { UserRepository } from '../services/repository/User';
import User from '../entities/User';

export class InmemoryUserRepository implements UserRepository {
  public readonly collection: Collection;
  constructor(db: Db, collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  async create(user: User): Promise<boolean> {
    const {
      result: { ok },
    }: InsertOneWriteOpResult = await this.collection.insertOne(user);
    return !!ok;
  }
  async findByUsername(username: string): Promise<User | null> {
    return await this.collection.findOne({ username });
  }
  async isValid(user: User, password: string): Promise<boolean> {
    return user.password === password;
  }
}
