import { User } from '../../entities/user';
import { Db, Collection } from 'mongodb';

export class AuthMapper {
  private collection: Collection<User>;

  constructor(private db: Db) {
    this.collection = db.collection('users');
  }

  findByEmail = async (email: string): Promise<User | null> => {
    return await this.collection.findOne({ email });
  }

  register = async (user: User) => {
    this.collection.insertOne(user);
  }
}
