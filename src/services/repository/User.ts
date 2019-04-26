import User from '../../entities/User';

export interface UserRepository {
  create(user: User): Promise<boolean>;
  findByUsername(username: string): Promise<User | null>;
  isValid(user: User, password: string): Promise<boolean>;
}
