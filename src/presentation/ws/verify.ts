import { User } from '../../entities/user';
import { verifyFunc } from 'socketio-jwt-auth';
import { AuthMapper } from '../../database/mapper/auth';

export const verifyWithDb = (authMapper: AuthMapper): verifyFunc => {
  const verify: verifyFunc = async (payload: User, done) => {
    if (payload.email) {
      try {
        const user = await authMapper.findByEmail(payload.email);
        if (user) {
          return done(null, user);
        }
        return done(null, null, 'user does not exist');
      } catch (error) {
        return done(error);
      }
    }
    return done();
  };
  return verify;
};
