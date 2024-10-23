import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UsersControllers } from './users.controller';
import { JwtAuthModule } from '../jwt-module/jwt.module';

@Module({
  imports: [
    JwtAuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository],
  controllers: [UsersControllers],
  exports: [],
})
export class UsersModule {}
