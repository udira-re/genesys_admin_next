export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface TLoginSchema {
  email: string;
  password: string;
}
