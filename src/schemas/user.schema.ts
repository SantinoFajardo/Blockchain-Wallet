import { Schema } from 'mongoose';
import { IUserDocument } from '../interfaces/user.interface';

export const UserSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: [true, 'User email cannot be empty'] },
    password: {
      type: String,
      required: [true, 'User password cannot be emoty'],
    },
  },
  { timestamps: true },
);
