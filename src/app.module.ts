// app.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users/users.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // 실제로 사용 시 보안상의 이유로 환경 변수 등으로 관리하는 것을 추천합니다.
      signOptions: { expiresIn: '1h' }, // 토큰의 만료 시간 (1시간)
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class AppModule {}
