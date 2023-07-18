// users.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create0user.dto';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: CreateUserDto, @Res() response): Promise<void> {
    const user = await this.usersService.findByUserAndPassword(
      dto.user,
      dto.password,
    );
    console.log('user', user);
    if (!user) {
      response.status(401).json({ message: '인증 실패' });
      return;
    }

    // 사용자가 유효하다면 토큰을 발급하여 클라이언트에게 반환합니다.
    const payload = { user: user.user, sub: user.userId };
    const token = this.jwtService.sign(payload);
    response.json({ access_token: token, meassge: '로그인 성공' });
  }

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response,
  ): Promise<void> {
    await this.usersService.createUser(createUserDto);
    response.json({ meassge: '회원가입 성공' });
  }

  @Get('list')
  async getUserList(): Promise<any[]> {
    return this.usersService.getUserList();
  }
}
