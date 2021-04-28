import jwt from 'jsonwebtoken';
import {
  LoginInfo, User, UserHidePassword, UserToken,
} from './types';

const secret = process.env.SECRET || 'secret';
const validationPattern = /(?=.*\d)(?=.* [a - z])(?=.* [A - Z]).{ 8,}/;
const validationMessage = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';

// users hardcoded for simplicity, store in a db for production applications
const users: User[] = [{ id: 1, username: 'test', password: 'test' }];

const omitPassword = (user: User): UserHidePassword => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const authenticate = async ({ username, password }: LoginInfo): Promise<UserToken> => {
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) throw new Error('Username or password is incorrect');

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });

  return {
    ...omitPassword(user),
    token,
  };
};

export const registerUser = async ({
  username,
  password,
}: LoginInfo): Promise<UserHidePassword> => {
  const user = users.find((u) => u.username === username);
  if (user) {
    // user exists, throw error
    throw new Error(`User with name ${username} already exists`);
  }
  if (!validationPattern.test(password)) {
    // password not strong enough
    throw new Error(validationMessage);
  }
  // return the created user object
  return { id: 1, username: 'test' };
};

export const getAll = async () => users.map((u) => omitPassword(u));
