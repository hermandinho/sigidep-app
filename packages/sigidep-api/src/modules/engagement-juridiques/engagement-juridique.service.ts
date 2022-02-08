import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EngagementJuridiqueEntity } from '@entities/engagement-juridique.entity';
import { CreateEngagementJuridiqueDTO } from './dto/create-engagement-juridique.dto';

@Injectable()
export class EngagementJuridiqueService {
  constructor(
    @InjectRepository(EngagementJuridiqueEntity)
    private readonly repository: Repository<EngagementJuridiqueEntity>,
  ) {}

  public getRepository(): Repository<EngagementJuridiqueEntity> {
    return this.repository;
  }

  public async filter(): Promise<EngagementJuridiqueEntity[]> {
    return this.repository.createQueryBuilder('ej').getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateEngagementJuridiqueDTO,
    user: UserEntity,
  ): Promise<EngagementJuridiqueEntity> {
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: CreateEngagementJuridiqueDTO,
    user: UserEntity,
  ): Promise<EngagementJuridiqueEntity> {
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
