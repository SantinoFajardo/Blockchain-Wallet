import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(userEmail: string, userPassword: string) {
    return await this.userRepository.saveUserOnDb(userEmail, userPassword);
  }
}
