import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@modules/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET') ?? process.env.JWT_SECRET,
          signOptions: {
            expiresIn:
              config.get('JWT_EXPIRES_IN') ?? process.env.JWT_EXPIRES_IN,
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
