import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserDocument } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<IUserDocument>) {}

  public async saveUserOnDb(
    userEmail: string,
    userPassword: string,
  ): Promise<IUserDocument> {
    const user = new this.userModel({
      email: userEmail,
      password: userPassword,
    });

    return await user.save();
  }
}
