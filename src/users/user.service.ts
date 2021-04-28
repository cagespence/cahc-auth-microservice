import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../entity/user/User';
import {
  LoginInfo, User as UserType, UserHidePassword, UserToken,
} from './types';

const secret = process.env.SECRET || 'secret';
const validationPattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const validationMessage = 'Must contain at least one number and one uppercase and lowercase letter, and 6 - 16 characters';

// users hardcoded for simplicity, store in a db for production applications
const users: User[] = [{ id: 1, username: 'test', password: 'test' }];

const omitPassword = (user: UserType): UserHidePassword => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const authenticate = async ({ username, password }: LoginInfo): Promise<UserToken> => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ username, password });

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
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ username, password });
  if (user) {
    // user exists, throw error
    throw new Error(`User with name ${username} already exists`);
  }

  if (!validationPattern.test(password)) {
    // password not strong enough
    throw new Error(validationMessage);
  }

  const newUser = new User();
  newUser.username = username;
  newUser.password = password;

  const savedUser = await userRepository.save(newUser);

  // return the created user object
  return { ...omitPassword(savedUser) };
};

export const getAll = async () => users.map((u) => omitPassword(u));
