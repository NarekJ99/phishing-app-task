// users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAuthDto } from './dto/userAuthDto.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) { }

  @Post('register')
  async register(@Body() registerUserDto: UserAuthDto) {
    return this.usersService.create(registerUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: UserAuthDto) {
    return this.usersService.login(createUserDto);
  }
}
