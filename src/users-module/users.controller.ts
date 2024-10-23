import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDTO } from '../dto/login-user.dto';
import { JwtService } from '../jwt-module/jwt.service';

@Controller('user')
export class UsersControllers {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  public async loginUser(@Body() body: LoginUserDTO) {
    try {
      const token = this.jwtService.generateToken({
        email: body.email,
        id: body.userId,
      });

      return { data: token, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  @Post('/register')
  public async createUser(@Body() body: CreateUserDTO) {
    try {
      const user = await this.userService.createUser(body.email, body.password);

      return {
        data: user,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }
}
