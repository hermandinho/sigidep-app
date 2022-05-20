import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { CreateEngagementMandatDecissionDTO } from '../dto/create-engagement-mandats-decission.dto';
import {
  EngagementMandatDecissionEntity,
  EtatEngagementMandatDecissionEnum,
} from '@entities/engagement-mandat-decission.entity';

@Injectable()
export class EngagementMandatsDecissionService {
  constructor(
    @InjectRepository(EngagementMandatDecissionEntity)
    private readonly repository: Repository<EngagementMandatDecissionEntity>,
  ) {}

  public getRepository(): Repository<EngagementMandatDecissionEntity> {
    return this.repository;
  }

  public async filter(): Promise<EngagementMandatDecissionEntity[]> {
    return (
      this.repository
        .createQueryBuilder('eng')
        .leftJoinAndSelect('eng.numActeJuridique', 'gest')
        //.leftJoinAndSelect('eng.traitement', 'code')
        .getMany()
    );
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateEngagementMandatDecissionDTO,
    user: UserEntity,
  ): Promise<EngagementMandatDecissionEntity> {
    //console.log(payload)
    payload.etat = EtatEngagementMandatDecissionEnum.SAVE;
    return this.repository.save({
      ...(payload as any),
      createdBy: user,
    });
  }

  public async update(
    payload: CreateEngagementMandatDecissionDTO,
    user: UserEntity,
    reserve: boolean = false,
  ): Promise<EngagementMandatDecissionEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }

    payload = {
      ...payload,
      etat: reserve
        ? EtatEngagementMandatDecissionEnum.RESERVED
        : EtatEngagementMandatDecissionEnum.MODIFY,
    };

    return this.repository.save({
      ...(payload as any),
      updateBy: user,
    });
  }

  public async cancelReservation(
    id: number,
  ): Promise<EngagementMandatDecissionEntity> {
    const property = await this.repository.findOne({
      id: id,
    });

    return this.repository.save({
      ...property, // existing fields
      etat: EtatEngagementMandatDecissionEnum.CANCEL, // updated fields
    });
  }
}
