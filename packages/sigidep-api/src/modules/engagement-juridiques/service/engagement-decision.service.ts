import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EngagementDecisionEntity } from '@entities/engagement-decision.entity';
import { EngagementDecisionDTO } from '../dto/create-engagement-decision.dto';

@Injectable()
export class EngagementDecisionService {
  constructor(
    @InjectRepository(EngagementDecisionEntity)
    private readonly repository: Repository<EngagementDecisionEntity>,
  ) {}

  public getRepository(): Repository<EngagementDecisionEntity> {
    return this.repository;
  }

  public async filter(): Promise<EngagementDecisionEntity[]> {
    return this.repository.createQueryBuilder('ed').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EngagementDecisionDTO,
    user: UserEntity,
  ): Promise<EngagementDecisionEntity> {
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: EngagementDecisionDTO,
    user: UserEntity,
  ): Promise<EngagementDecisionEntity> {
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
