import { Document } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}
