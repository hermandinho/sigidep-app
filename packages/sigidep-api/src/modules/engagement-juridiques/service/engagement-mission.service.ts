import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EtatEngagementEnum } from '@entities/engagement-juridique.entity';
import { EngagementMissionEntity } from '@entities/engagement-mission.entity';
import { EngagementMissionDTO } from '../dto/create-engagement-mission.dto';
import { EngagementFilter } from '@utils/engagement-filter';

@Injectable()
export class EngagementMissionService {
  constructor(
    @InjectRepository(EngagementMissionEntity)
    private readonly repository: Repository<EngagementMissionEntity>,
  ) {}

  public getRepository(): Repository<EngagementMissionEntity> {
    return this.repository;
  }

  public async filter(
    filter?: EngagementFilter,
  ): Promise<EngagementMissionEntity[]> {
    return this.repository
      .createQueryBuilder('em')
      .leftJoinAndSelect('em.baremeJour', 'b')
      .where(filter?.procedures ? 'em.codeProcedure IN(:...codes)' : 'true', {
        codes: filter?.procedures,
      })
      .andWhere(filter?.etats ? 'em.etat IN(:...etats)' : 'true', {
        etats: filter?.etats,
      })
      .andWhere(filter?.numeros ? 'em.numero IN(:...numero)' : 'true', {
        numero: filter?.numeros,
      })
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EngagementMissionDTO,
    user: UserEntity,
  ): Promise<EngagementMissionEntity> {
    payload.etat = EtatEngagementEnum.SAVE;
    const val1: string = payload.adminUnit?.substring(2, 4);
    const val2: string = (
      '00000' + Number(Math.floor(Math.random() * 100000))
    ).slice(-5);

    payload.numero = payload.exercise + 'CE' + val1 + '-' + val2;
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: EngagementMissionDTO,
    user: UserEntity,
    reserve: boolean = false,
  ): Promise<EngagementMissionEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }
    payload = {
      ...(payload as any),
      etat: reserve ? EtatEngagementEnum.RESERVED : EtatEngagementEnum.MODIFY,
      montantAE_Reserve: reserve ? payload.montantAE : 0
    };
    return this.repository.save({
      ...(payload as any),
      updateBy: user,
    });
  }

  public async findEngagement(): Promise<EngagementMissionEntity[]> {
    return this.repository
      .createQueryBuilder('engagement_juridique')
      .where('engagement_juridique.etat = :name', { name: 'labels.book' })
      .where('engagement_juridique.code_procedure = :name', { name: '1121' })
      .getMany();
  }
}
