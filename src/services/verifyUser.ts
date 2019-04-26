import { UserRepository } from './repository/User';
import User from '../entities/User';

export default async (userRepository: UserRepository, user: User) => {
  const foundUser = await userRepository.findByUsername(user.username);
  if (foundUser) {
    if (!(await userRepository.isValid(foundUser, user.password))) {
      throw new Error('wrong password');
    }
  } else {
    throw new Error("username doesn't exists");
  }
};
