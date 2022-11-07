import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EngagementFilter } from '../../../utils/engagement-filter';
import { BonEngagementEntity } from '../../../entities/bon-engagement.entity';
import { EtatBonEnum } from '@utils/etat-bon.enum';
import { getAbbreviation } from '../../../utils/functions';
import { PaiementEntity } from '../../../entities/paiement.entity';
import { CreatePaiementDTO } from '../dto/create-paiement.dto';

@Injectable()
export class PaiementService {
  constructor(
    @InjectRepository(PaiementEntity)
    private readonly repository: Repository<PaiementEntity>,

    @InjectRepository(BonEngagementEntity)
    private readonly repositoryBon: Repository<BonEngagementEntity>,
  ) {}

  public getRepository(): Repository<PaiementEntity> {
    return this.repository;
  }

  public async filter(filter?: EngagementFilter): Promise<PaiementEntity[]> {
    return this.repository
      .createQueryBuilder('paiement')
      .where('paiement.bon.id = :id', { id: filter?.ids })
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreatePaiementDTO,
    user: UserEntity,
  ): Promise<CreatePaiementDTO> {
    const count = await this.repository.count();
    const val1: string = payload?.bon?.numActeJuridique.exercise;
    const val2: string = ('00000' + Number(count + 1)).slice(-7);

    payload.numeroPaiement = val1 + 'P' + val2;
    const traitement = this.repository.save({
      ...(payload as any),
      createdBy: user,
    });

    const property = await this.repositoryBon.findOne({
      id: payload?.bon.id,
    });

    const bon = this.repositoryBon.save({
      ...property,
      etat: EtatBonEnum.VALIDATIONCOMPTABLE,
    });

    return traitement;
  }

  public async update(
    payload: CreatePaiementDTO,
    user: UserEntity,
  ): Promise<CreatePaiementDTO> {
    console.log(payload);
    /*   const check = await this.repositoryBon.findOne({
      id: payload?.id,
    });
    if (!check) {
      throw new NotFoundException();
    } */
    if (payload?.data?.action === 'rejeter-mandat') {
      console.log('rejeter-mandat', payload);
      const date = new Date();
      const etated = EtatBonEnum.REJETVALIDATIONACT;
      const property = await this.repositoryBon.findOne(payload?.data?.bon?.id);
      const bon = this.repositoryBon.save({
        ...(property as any), // existing fields
        etat: etated,
        updateBy: user,
        rejet: true,
        dateRejet: date,
        motif: payload?.motif,
      });
      return bon;
    } else if (payload?.action === 'payer-mandat') {
      console.log('payer-mandat', payload);
      const etated = EtatBonEnum.PAIEMENT;
      const property = await this.repositoryBon.findOne(payload?.bon?.id);
      const bon = this.repositoryBon.save({
        ...(property as any), // existing fields
        etat: etated,
        updateBy: user,
      });

      const paiement = this.repository.save({
        ...(payload as any),
        updateBy: user,
      });
      return bon;
    }
    /*  if(payload?.action === 'modifier'){
       const property = await this.repositoryBon.findOne({
         id: payload?.bon.id,
       });
   
       const bon = this.repositoryBon.save({
         ...property,
         etat: EtatBonEnum.LIQUIDATIONMODIFIEE,
       })
 
       return this.repository.save({
         ...(payload as any),
         typeTraitement: EtatBonEnum.LIQUIDATIONMODIFIEE,
         updateBy: user,
       });
     } */
  }
}
