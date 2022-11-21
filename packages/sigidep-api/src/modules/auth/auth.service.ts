import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserAccountStatusEnum } from '@utils/constants';
import { ForgotPassWordDto } from './dto/forgot-password.dto';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    // private readonly mailService: MailService,
  ) { }

  public async findUserById(id: number): Promise<UserEntity> {
    return this.usersRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .leftJoinAndSelect('permissions.permission', 'permission')
      .where('u.id = :id', { id })
      .getOne();
  }

  public async login({
    username,
    password,
  }: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepository
      .createQueryBuilder('u')
      .where('u.username = :username', { username })
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }

    if (user.status === UserAccountStatusEnum.INACTIVE) {
      throw new ForbiddenException();
    }

    const checkCredentials = await user.validatePassword(
      password,
      user.salt,
      user.password,
    );
    if (!checkCredentials) {
      throw new NotFoundException();
    }

    user.lastConnectedAt = new Date().toISOString();
    await user.save();

    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  public async forgotPassword(payload: ForgotPassWordDto): Promise<UserEntity> {
    const email = payload.email
    const user = await this.usersRepository
      .createQueryBuilder('u')
      .where('u.email = :email', { email })
      .getOne();

    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    if (user.status !== UserAccountStatusEnum.ACTIVE) {
      throw new MethodNotAllowedException();
    }

    return;
  }

  async changePassword(currentUser: UserEntity, changePasswordDto: ChangePasswordDto): Promise<any> {
    const checkCredentials = await currentUser.validatePassword(
      changePasswordDto.password,
      currentUser.salt,
      currentUser.password,
    );
    if (!checkCredentials) {
      throw new NotFoundException();
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(changePasswordDto.newPassword, salt);

    try {
      console.log('currentUser', currentUser)
      console.log('changePasswordDto', changePasswordDto)
      const user = await this.usersRepository.save({
        ...currentUser,
        password: password,
        salt: salt,
      });
      console.log('user', user)
      return user;
    } catch (e) {
      throw new ConflictException(`Le username doit être unique`);
    }
  }

}
