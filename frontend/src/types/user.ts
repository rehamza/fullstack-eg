export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt?: null;
}

export interface ÏToken {
  accessToken: string;
  refreshToken: string;
}
