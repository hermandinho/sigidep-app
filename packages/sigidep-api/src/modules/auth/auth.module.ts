import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {JwtStrategy} from "@modules/auth/jwt.strategy";

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  exports: [TypeOrmModule, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
