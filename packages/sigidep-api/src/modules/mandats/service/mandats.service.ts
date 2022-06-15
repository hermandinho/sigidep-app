import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { MandatEntity } from '@entities/mandat.entity';
import { CreateMandatDTO } from '../dto/create-mandat.dto';
import { EngagementFilter } from '@utils/engagement-filter';
import { EtatMandatEnum } from '@utils/etat-mandat.enum';
import { CreateTraitementMandatDTO } from '../dto/create-treatment-mandat.dto';
import { TraitementMandatEntity } from '@entities/traitement-mandat.entity';
import { PaiementEntity } from '@entities/paiement.entity';

@Injectable()
export class MandatService {
  constructor(
    @InjectRepository(MandatEntity)
    private readonly repository: Repository<MandatEntity>,

    @InjectRepository(TraitementMandatEntity)
    private readonly traitementMandatRepository: Repository<TraitementMandatEntity>,

    @InjectRepository(PaiementEntity)
    private readonly paiementMandatRepository: Repository<PaiementEntity>,
  ) {}

  public getRepository(): Repository<MandatEntity> {
    return this.repository;
  }

  public async filter(filter?: EngagementFilter): Promise<MandatEntity[]> {
    console.log(filter.imputation)
    return this.repository
      .createQueryBuilder('mandat')
      .leftJoinAndSelect('mandat.numActeJuridique', 'eng')
      .leftJoinAndSelect('mandat.traitements', 'traitements')
      .leftJoinAndSelect('mandat.paiements', 'paiements')
      .where(filter?.procedures ? 'eng.codeProcedure IN(:...codes)' : 'true', {
        codes: filter?.procedures,
      })
      .andWhere(filter?.etats ? 'mandat.etat IN(:...etats)' : 'true', {
        etats: filter?.etats,
      })
      .andWhere(filter?.imputation ? 'eng.imputation IN(:...numeroj)' : 'true', {
        numeroj: filter?.imputation,
      })
      .getMany();
  }

  public async deleteOne(id: number): Promise<any> {
    return this.repository.delete({ id });
  }

  public async create(
    payload: CreateMandatDTO,
    user: UserEntity,
  ): Promise<MandatEntity> {
    console.log(payload);
    
    
    const mandat = await this.repository.save({
      ...(payload as any),
      createdBy: user,
      etat: EtatMandatEnum.MANDATENREGISTRE, //-Mandat enregistré ref-table Traitement
    });

    const traitementPayload:CreateTraitementMandatDTO = {
      mandat:mandat.id,
      typeTraitement:EtatMandatEnum.MANDATENREGISTRE,
      observation:'',
      qteUnitePhysiqueReal:null,
      montantTotalUnitPhysReal:null
      
    };
    this.ajouterTraitement(traitementPayload,user);
    this.ajouterPaiement(traitementPayload,user)
    return mandat;
  }

  public async update(
    payload: CreateMandatDTO,
    user: UserEntity,
    reserve: boolean = false,
  ): Promise<MandatEntity> {
    const check = await this.repository.findOne({
      id: payload.id,
    });

    if (!check) {
      throw new NotFoundException();
    }
    const mandat = await this.repository.save({
      ...(payload as any),
      updateBy: user,
      etat: reserve
        ? EtatMandatEnum.MANDATRESERVE
        : EtatMandatEnum.MANDATMODIFIE, //reservé ou modifié
    });
    const traitementPayload:CreateTraitementMandatDTO = {
      mandat:mandat.id,
      typeTraitement:EtatMandatEnum.MANDATENREGISTRE,
      observation:'',
      qteUnitePhysiqueReal:null,
      montantTotalUnitPhysReal:null
      
    };
    this.modifierTraitement(traitementPayload,user)
    return mandat;
  }

  public async cancelReservation(id: number): Promise<MandatEntity> {
    const property = await this.repository.findOne({
      id: id,
    });

    return this.repository.save({
      ...property, // existing fields
      etat: EtatMandatEnum.ANNULATIONMANDAT, // annulation du mandat
    });
  }

  /**
   * Cett méthode ajoute un traitement à la liste des traitemenst d'un mandat
   * @param payload le traitement en question
   * @param user
   * @returns
   */

  public async ajouterTraitement(
    payload: CreateTraitementMandatDTO,
    user: UserEntity,
  ): Promise<MandatEntity> {
    const traitementPayload = {
      ...payload,
      createdBy: user,
      mandat: {
        id: payload.mandat,
      } as MandatEntity,
    };

    const mandat = await this.repository.findOne(payload.mandat);
    const updatedMandat = await this.repository.save({
      ...mandat,
      updateBy: user,
      etat: payload.typeTraitement,
    });
    const traitement = await this.traitementMandatRepository.save(
      traitementPayload,
    );
    await this.repository
      .createQueryBuilder()
      .relation(MandatEntity, 'traitements')
      .of(updatedMandat)
      .add(traitement);

    return await this.repository.findOne(payload.mandat);
  }

  public async modifierTraitement(
    payload: CreateTraitementMandatDTO,
    user: UserEntity,
  ): Promise<MandatEntity> {
    const traitementPayload = {
      ...payload,
      updateBy: user,
      mandat: {
        id: payload.mandat,
      } as MandatEntity,
    };

    const mandat = await this.repository.findOne(payload.mandat);
    const updatedMandat = await this.repository.save({
      ...mandat,
      updateBy: user,
      etat: payload.typeTraitement,
    });
    const traitement = await this.traitementMandatRepository.save(
      traitementPayload,
    );
    await this.repository
      .createQueryBuilder()
      .relation(MandatEntity, 'traitements')
      .of(updatedMandat)
      .add(traitement);

    return await this.repository.findOne(payload.mandat);
  }

  public async ajouterPaiement(
    payload: any,
    user: UserEntity,
  ): Promise<MandatEntity> {
    const paiementPayload = {
      ...payload,
      createdBy: user,
      mandat: {
        id: payload.mandat,
      } as MandatEntity,
    };

    const mandat = await this.repository.findOne(payload.mandat);
    const updatedMandat = await this.repository.save({
      ...mandat,
      updateBy: user,
      //etat: payload.typeTraitement,
    });
    const traitement = await this.paiementMandatRepository.save(
      paiementPayload,
    );
    await this.repository
      .createQueryBuilder()
      .relation(MandatEntity, 'paiements')
      .of(updatedMandat)
      .add(traitement);

    return await this.repository.findOne(payload.mandat);
  }
}
