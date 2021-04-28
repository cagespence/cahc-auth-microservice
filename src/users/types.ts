export interface LoginInfo {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface UserHidePassword {
  id: number;
  username: string;
}

export interface UserToken {
  id: number;
  username: string;
  token: string;
}
