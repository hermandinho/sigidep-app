import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EngagementJuridiqueEntity } from '@entities/engagement-juridique.entity';
import { CreateEngagementJuridiqueDTO } from '../dto/create-engagement-juridique.dto';
import { EngagementMissionEntity } from '@entities/engagement-mission.entity';
import { EngagementMissionDTO } from '../dto/create-engagement-mission.dto';

@Injectable()
export class EngagementMissionService {
  constructor(
    @InjectRepository(EngagementMissionEntity)
    private readonly repository: Repository<EngagementMissionEntity>,
  ) {}

  public getRepository(): Repository<EngagementMissionEntity> {
    return this.repository;
  }

  public async filter(): Promise<EngagementMissionEntity[]> {
    return this.repository.createQueryBuilder('em').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EngagementMissionDTO,
    user: UserEntity,
  ): Promise<EngagementMissionEntity> {
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: EngagementMissionDTO,
    user: UserEntity,
  ): Promise<EngagementMissionEntity> {
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
