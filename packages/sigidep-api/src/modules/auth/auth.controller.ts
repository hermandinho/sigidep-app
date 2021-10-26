import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { UserEntity } from '@entities/user.entity';
import { GetCurrentUser } from '@decorators/get-current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  public async login(
    @Body(ValidationPipe) payload: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.service.login(payload);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  public getMe(@GetCurrentUser() user: UserEntity): Promise<UserEntity> {
    return Promise.resolve(user);
  }
}
