import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserAccountStatusEnum } from '@utils/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

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
}
