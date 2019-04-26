import { UserRepository } from './repository/User';
import User from '../entities/User';

export default async (userRepository: UserRepository, user: User) => {
  const isExistentUsername = await userRepository.findByUsername(user.username);
  if (!isExistentUsername) {
    if (!(await userRepository.create(user))) {
      throw new Error('database error');
    }
  } else {
    throw new Error('username exists');
  }
};
