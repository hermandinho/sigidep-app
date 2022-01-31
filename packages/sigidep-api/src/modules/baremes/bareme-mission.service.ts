import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { BaremeMissionEntity } from '@entities/bareme-mission.entity';
import { CreateBaremeMissionDTO } from './dto/create-bareme-mission.dto';

@Injectable()
export class BaremeMissionService {
  constructor(
    @InjectRepository(BaremeMissionEntity)
    private readonly repository: Repository<BaremeMissionEntity>,
  ) {}

  public getRepository(): Repository<BaremeMissionEntity> {
    return this.repository;
  }

  public async filter(): Promise<BaremeMissionEntity[]> {
    return this.repository.createQueryBuilder('b').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateBaremeMissionDTO,
    user: UserEntity,
  ): Promise<BaremeMissionEntity> {
    const check = await this.repository.findOne({
      code: payload.code,
    });

    if (check) {
      throw new ConflictException();
    }

    return this.repository.save({
      ...payload,
      createdBy: user,
    });
  }

  public async update(
    payload: CreateBaremeMissionDTO,
    user: UserEntity,
  ): Promise<BaremeMissionEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }

    return this.repository.save({
      ...payload,
      updateBy: user,
    });
  }
}
