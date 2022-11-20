import {
  Body,
  Controller,
  Get,
  Patch,
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
import { PermissionsGuard } from '@guards/permissions.guard';
import { ForgotPassWordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  @Get('/test')
  @UseGuards(new PermissionsGuard(['users.create']))
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  public test(@GetCurrentUser() user: UserEntity): Promise<UserEntity> {
    return Promise.resolve(user);
  }

 /*  @Post('/forgotPassword')
    async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPassWordDto): Promise<void>{
      return this.service.forgotPassword(forgotPasswordDto);
    }; */

    @Patch('/changePassword')
    @UseGuards(AuthGuard())
    async changePassword(
        @GetCurrentUser() user: UserEntity,
        @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
    ): Promise<boolean> {
        return this.service.changePassword(user, changePasswordDto);
    }
}
