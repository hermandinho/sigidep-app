import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EngagementCommandeEntity } from '@entities/engagement-commande.entity';
import { EngagementCommandeDTO } from '../dto/create-engagement-commande.dto';
import { EtatEngagementEnum } from '@entities/engagement-juridique.entity';
import { ProcedureCommande } from '../types';
import { EngagementFilter } from '@utils/engagement-filter';

@Injectable()
export class EngagementCommandeService {
  constructor(
    @InjectRepository(EngagementCommandeEntity)
    private readonly repository: Repository<EngagementCommandeEntity>,
  ) {}

  public getRepository(): Repository<EngagementCommandeEntity> {
    return this.repository;
  }

  public async filter(
    filter?: EngagementFilter,
  ): Promise<EngagementCommandeEntity[]> {
    return this.repository
      .createQueryBuilder('ej')
      .leftJoinAndSelect('ej.taxesApplicable', 'taxe')
      .where(filter?.procedures ? 'ej.codeProcedure IN(:...codes)' : 'true', {
        codes: filter?.procedures,
      })
      .andWhere(filter?.etats ? 'ej.etat IN(:...etats)' : 'true', {
        etats: filter?.etats,
      })
      .andWhere(filter?.numeros ? 'ej.numero IN(:...numero)' : 'true', {
        numero: filter?.numeros,
      })
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EngagementCommandeDTO,
    user: UserEntity,
  ): Promise<EngagementCommandeEntity> {
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
    payload: EngagementCommandeDTO,
    user: UserEntity,
    reserve: boolean = false,
  ): Promise<EngagementCommandeEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }
    payload = {
      ...payload,
      etat: reserve ? EtatEngagementEnum.RESERVED : EtatEngagementEnum.MODIFY,
    };

    return this.repository.save({
      ...(payload as any),
      updateBy: user,
    });
  }
}
