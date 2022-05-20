import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { TraitementMandatEntity } from '@entities/traitement-mandat.entity';

@Injectable()
export class TraitementMandatService {
  constructor(
    @InjectRepository(TraitementMandatEntity)
    private readonly repository: Repository<TraitementMandatEntity>,
  ) {}

  public getRepository(): Repository<TraitementMandatEntity> {
    return this.repository;
  }

  public async filter(mandatId: number): Promise<TraitementMandatEntity[]> {
    return this.repository
      .createQueryBuilder('traitement')
      .where('traitement.mandat.id = :id', { id: mandatId })
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: TraitementMandatEntity,
    user: UserEntity,
  ): Promise<TraitementMandatEntity> {
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: TraitementMandatEntity,
    user: UserEntity,
  ): Promise<TraitementMandatEntity> {
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
