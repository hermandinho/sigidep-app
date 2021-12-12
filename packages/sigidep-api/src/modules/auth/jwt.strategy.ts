import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '@entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET') ?? process.env.JWT_SECRET,
    });
  }

  public async validate({ id }: { id: number }): Promise<UserEntity> {
    try {
      return await this.authService.findUserById(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
