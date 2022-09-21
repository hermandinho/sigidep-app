import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { TraitementBonEngagementEntity } from '@entities/traitement-bon-engagement.entity';
import { EngagementFilter } from '../../../utils/engagement-filter';
import { CreateTraitementBonEngagementDTO } from '../dto/create-traitement-bon-engagement.dto';
import { BonEngagementEntity } from '../../../entities/bon-engagement.entity';
import { EtatBonEnum } from '@utils/etat-bon.enum';
import { getAbbreviation } from '../../../utils/functions';

@Injectable()
export class TraitementBonEngagementService {
  constructor(
    @InjectRepository(TraitementBonEngagementEntity)
    private readonly repository: Repository<TraitementBonEngagementEntity>,

    @InjectRepository(BonEngagementEntity)
    private readonly repositoryBon: Repository<BonEngagementEntity>,

  ) {}

  public getRepository(): Repository<TraitementBonEngagementEntity> {
    return this.repository;
  }

  public async filter(filter?: EngagementFilter): Promise<TraitementBonEngagementEntity[]> {
    return this.repository
      .createQueryBuilder('traitement')
      .where('traitement.bon.id = :id', { id: filter?.ids })
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateTraitementBonEngagementDTO,
    user: UserEntity,
  ): Promise<CreateTraitementBonEngagementDTO> {
    const count = await this.repository.count();
    const val1: string = 'DAAF';
    const val2: string = ('00000' + Number(count + 1)).slice(-5);

    payload.numOrdreLiquidation = val1 + '-' + val2;
    const traitement = this.repository.save({
      ...(payload as any),
      typeTraitement: EtatBonEnum.ENREGISTREMENTLIQUIDATION,
      createdBy: user,
    });

    const property = await this.repositoryBon.findOne({
      id: payload.bon.id,
    });

    const bon = this.repositoryBon.save({
      ...property,
      etat: EtatBonEnum.ENREGISTREMENTLIQUIDATION,
    })

    return  traitement;
  }

  public async update(
    payload: CreateTraitementBonEngagementDTO,
    user: UserEntity,
  ): Promise<CreateTraitementBonEngagementDTO> {
    console.log(payload)
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }
    if(payload.action === 'modifier'){
      const property = await this.repositoryBon.findOne({
        id: payload.bon.id,
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
    }else if(payload.action === 'valider'){
      const property = await this.repositoryBon.findOne({
        id: payload.bon.id,
      });
  
      const bon = this.repositoryBon.save({
        ...property,
        etat: EtatBonEnum.VALIDATIONLIQUIDATION,
      })

      return this.repository.save({
        ...(payload as any),
        typeTraitement: EtatBonEnum.VALIDATIONLIQUIDATION,
        updateBy: user,
      });
    }else if(payload.action === 'mandater'){
      const property = await this.repositoryBon.findOne({
        id: payload.bon.id,
      });
  
      const bon = this.repositoryBon.save({
        ...property,
        etat: EtatBonEnum.ORDONNANCEMENT,
      })

      return this.repository.save({
        ...(payload as any),
        typeTraitement: EtatBonEnum.ORDONNANCEMENT,
        updateBy: user,
      });
    }else if(payload.action === 'editer_mandat_paiement'){
      const property = await this.repositoryBon.findOne({
        id: payload.bon.id,
      });
  
      const bon = this.repositoryBon.save({
        ...property,
        etat: EtatBonEnum.MANDATDEPAIEMENT,
      })

      return this.repository.save({
        ...(payload as any),
        typeTraitement: EtatBonEnum.MANDATDEPAIEMENT,
        updateBy: user,
      });
    }else if(payload.action === 'editer_rapport'){
      const property = await this.repositoryBon.findOne({
        id: payload.bon.id,
      });
  
      const bon = this.repositoryBon.save({
        ...property,
        etat: EtatBonEnum.RAPPORTDELIQUIDATION,
      })

      return this.repository.save({
        ...(payload as any),
        typeTraitement: EtatBonEnum.RAPPORTDELIQUIDATION,
        updateBy: user,
      });
    }

    

    
  }
}
