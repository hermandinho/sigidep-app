import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EngagementDecisionEntity } from '@entities/engagement-decision.entity';
import { EngagementDecisionDTO } from '../dto/create-engagement-decision.dto';
import { EtatEngagementEnum } from '@entities/engagement-juridique.entity';

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
    return this.repository
      .createQueryBuilder('ed')
      .leftJoinAndSelect('ed.taxesApplicable', 'taxe')
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: EngagementDecisionDTO,
    user: UserEntity,
  ): Promise<EngagementDecisionEntity> {
    payload.etat = EtatEngagementEnum.SAVE;
    const val1: string = payload.adminUnit?.substring(2, 4);
    const val2: string = (
      '00000' + Number(Math.floor(Math.random() * 31)).toString(2)
    ).slice(-5);

    payload.numero = payload.exercise + 'CE' + val1 + '-' + val2;
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
      numero: payload.numero,
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
