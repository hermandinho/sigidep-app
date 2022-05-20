import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import {
  EngagementJuridiqueEntity,
  EtatEngagementEnum,
} from '@entities/engagement-juridique.entity';
import { CreateEngagementJuridiqueDTO } from '../dto/create-engagement-juridique.dto';
import { EngagementFilter } from '@utils/engagement-filter';

@Injectable()
export class EngagementJuridiqueService {
  constructor(
    @InjectRepository(EngagementJuridiqueEntity)
    private readonly repository: Repository<EngagementJuridiqueEntity>,
  ) {}

  public getRepository(): Repository<EngagementJuridiqueEntity> {
    return this.repository;
  }

  public async filter(
    filter?: EngagementFilter,
  ): Promise<EngagementJuridiqueEntity[]> {
    return this.repository
      .createQueryBuilder('eng')
      .where(filter?.procedures ? 'eng.codeProcedure IN(:...codes)' : 'true', {
        codes: filter?.procedures,
      })
      .andWhere(filter?.etats ? 'eng.etat IN(:...etats)' : 'true', {
        etats: filter?.etats,
      })
      .getMany();
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

  public async cancelReservation(
    id: number,
  ): Promise<EngagementJuridiqueEntity> {
    const property = await this.repository.findOne({
      id: id,
    });

    return this.repository.save({
      ...property, // existing fields
      etat: EtatEngagementEnum.CANCEL, // updated fields
    });
  }
}
