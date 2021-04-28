import jwt from 'jsonwebtoken';
import {
  LoginInfo, User, UserHidePassword, UserToken,
} from './types';

const secret = process.env.SECRET || 'secret';

// users hardcoded for simplicity, store in a db for production applications
const users: User[] = [{ id: 1, username: 'test', password: 'test' }];

const omitPassword = (user: User): UserHidePassword => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const authenticate = async ({ username, password }: LoginInfo): Promise<UserToken> => {
  console.log(username, password);
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) throw new Error('Username or password is incorrect');

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });

  return {
    ...omitPassword(user),
    token,
  };
};

export const getAll = async () => users.map((u) => omitPassword(u));
