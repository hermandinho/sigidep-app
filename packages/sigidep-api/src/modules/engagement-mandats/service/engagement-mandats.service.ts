import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { CreateEngagementMandatDTO } from '../dto/create-engagement-mandats.dto';
import { EngagementMandatEntity } from '@entities/engagement-mandat.entity';

@Injectable()
export class EngagementMandatsService {
  constructor(
    @InjectRepository(EngagementMandatEntity)
    private readonly repository: Repository<EngagementMandatEntity>,
  ) {}

  public getRepository(): Repository<EngagementMandatEntity> {
    return this.repository;
  }

  public async filter(): Promise<EngagementMandatEntity[]> {
    return this.repository.createQueryBuilder('eng').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateEngagementMandatDTO,
    user: UserEntity,
  ): Promise<EngagementMandatEntity> {
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: CreateEngagementMandatDTO,
    user: UserEntity,
  ): Promise<EngagementMandatEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }

    return this.repository.save({
      ...(payload as any),
      updateBy: user,
    });
  }



}
