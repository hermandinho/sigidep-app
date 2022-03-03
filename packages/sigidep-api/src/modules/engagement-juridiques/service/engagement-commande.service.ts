import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EngagementCommandeEntity } from '@entities/engagement-commande.entity';
import { EngagementCommandeDTO } from '../dto/create-engagement-commande.dto';
import { EtatEngagementEnum } from '@entities/engagement-juridique.entity';

@Injectable()
export class EngagementCommandeService {
  constructor(
    @InjectRepository(EngagementCommandeEntity)
    private readonly repository: Repository<EngagementCommandeEntity>,
  ) {}

  public getRepository(): Repository<EngagementCommandeEntity> {
    return this.repository;
  }

  public async filter(): Promise<EngagementCommandeEntity[]> {
    return this.repository
      .createQueryBuilder('ej')
      .leftJoinAndSelect('ej.exercise', 'exercise')
      .leftJoinAndSelect('ej.sousProgramme', 's')
      .leftJoinAndSelect('ej.action', 'ac')
      .leftJoinAndSelect('ej.activity', 'a')
      .leftJoinAndSelect('ej.procedure', 'p')
      .leftJoinAndSelect('p.typeProcedure', 'typ')
      .leftJoinAndSelect('ej.task', 't')
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
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: EngagementCommandeDTO,
    user: UserEntity,
  ): Promise<EngagementCommandeEntity> {
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
