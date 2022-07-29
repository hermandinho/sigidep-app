import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { TraitementBonEngagementEntity } from '@entities/traitement-bon-engagement.entity';

@Injectable()
export class TraitementBonEngagementService {
  constructor(
    @InjectRepository(TraitementBonEngagementEntity)
    private readonly repository: Repository<TraitementBonEngagementEntity>,
  ) {}

  public getRepository(): Repository<TraitementBonEngagementEntity> {
    return this.repository;
  }

  public async filter(bonId: number): Promise<TraitementBonEngagementEntity[]> {
    return this.repository
      .createQueryBuilder('traitement')
      .where('traitement.bon.id = :id', { id: bonId })
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: TraitementBonEngagementEntity,
    user: UserEntity,
  ): Promise<TraitementBonEngagementEntity> {
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: TraitementBonEngagementEntity,
    user: UserEntity,
  ): Promise<TraitementBonEngagementEntity> {
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
