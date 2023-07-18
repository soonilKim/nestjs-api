import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from './users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key',
    });
  }

  async validate(payload: any) {
    // payload에는 토큰에서 추출한 정보가 들어있습니다.
    // 여기서 사용자를 검증하고 필요한 정보를 반환합니다.
    const user = await this.usersService.findByUser(payload.user);
    return user;
  }
}
