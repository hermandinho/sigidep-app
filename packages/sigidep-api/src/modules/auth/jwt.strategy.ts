import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '@entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
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
