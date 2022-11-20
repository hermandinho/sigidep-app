import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { UserAccountStatusEnum } from '../../utils/constants';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) { }

  public getRepository(): Repository<UserEntity> {
    return this.repository;
  }

  public async filter(): Promise<UserEntity[]> {
    return this.repository
    .createQueryBuilder('u')
    .leftJoinAndSelect('u.role', 'role')
    .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: UserDTO,
    user: UserEntity,
  ): Promise<UserEntity> {

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('sigidep', salt);
    try {
      return await this.repository.save({
        ...payload,
        password: password,
        salt: salt,
        status: UserAccountStatusEnum.ACTIVE,
        createdBy: user,
      });
    } catch (e) {
      throw new ConflictException(`Le username doit être unique`);
    }
  }

  public async desactiver(
    payload: UserDTO,
    user: UserEntity,
  ): Promise<UserEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }
    try {
      return await this.repository.save({
        ...payload,
        status: payload.status == UserAccountStatusEnum.ACTIVE ? UserAccountStatusEnum.INACTIVE : UserAccountStatusEnum.ACTIVE,
        createdBy: user,
      });
    } catch (e) {
      throw new ConflictException('Failed');
    }
  }
}
