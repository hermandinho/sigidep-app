import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { TransmissionReceptionEntity } from '@entities/transmission-reception.entity';
import { TransmissionReceptionDTO } from '../dto/transmission-receptions.dto';
import { EtatBonEnum } from '@utils/etat-bon.enum';
import { DetailTransmissionReceptionEntity } from '@entities/detail-transmission-reception.entity';
import { BonEngagementEntity } from '@entities/bon-engagement.entity';
import { EngagementFilter } from '@utils/engagement-filter';

@Injectable()
export class TransmissionReceptionService {
  constructor(
    @InjectRepository(TransmissionReceptionEntity)
    private readonly repository: Repository<TransmissionReceptionEntity>,

    @InjectRepository(DetailTransmissionReceptionEntity)
    private readonly repositorydetail: Repository<DetailTransmissionReceptionEntity>,

    @InjectRepository(BonEngagementEntity)
    private readonly repositorybon: Repository<BonEngagementEntity>,
  ) { }

  public getRepository(): Repository<TransmissionReceptionEntity> {
    return this.repository;
  }

  public async filter(filter?: EngagementFilter): Promise<TransmissionReceptionEntity[]> {
    console.log(filter?.objets)
    return this.repository
      .createQueryBuilder('transmission')
      .where(filter?.objets ? 'transmission.objet IN(:...codes)' : 'true', {
        codes: filter?.objets,
      })
      .andWhere(filter?.exercices ? 'transmission.numero like :exercices' : 'true', {
        exercices: filter?.exercices,
      })
      .getMany();
  }

  public async cancel(id: number): Promise<TransmissionReceptionEntity> {
    console.log('id ',id)
    this.getDossierBor(id).then((res: any) => {
      console.log('res ')
      for (let i = 0; i < res?.length; i++) {
        console.log('Bon annuler',res[i]?.bon_engagement)
        const property = res[i]?.bon_engagement;
        this.repositorybon.save({
          ...property, // existing fields
          etat: EtatBonEnum.RESERVE, // annulation du bon

        });
      }
    }

    );

    const property = await this.repository.findOne({
      id: id,
    });
    this.repository.save({
      ...property, // existing fields
      objet: EtatBonEnum.ANNULETRANSMISSIONCONTROLECONFORMITE, // annulation du bon

    });
    return property;
  }

  public async create(
    payload: TransmissionReceptionDTO,
    user: UserEntity,
  ): Promise<TransmissionReceptionEntity> {
    const count = await this.repository.count();
    console.log('resultat payload ',payload)
    const val1: string = (payload?.bon_engagement ? payload?.bon_engagement[0]?.numActeJuridique?.exercise : '55');
    const val2: string = ('0000000' + Number(count + 1)).slice(-7);

    payload.numero = val1 + 'B' + val2;
    let transPaylaod = {
      ...(payload as any),
      createdBy: user,
    };

    const bon = await this.repository.save(transPaylaod);
    console.log("payload?.transmission ", payload?.transmission)
    if (payload) {
      for (let i = 0; i < payload?.bon_engagement?.length; i++) {
        const property = payload?.bon_engagement[i];
        if (payload?.transmission === EtatBonEnum.TRANSMISCONTROLECONFORMITE) {
          this.repositorybon.save({
            ...(property as any), // existing fields
            etat: EtatBonEnum.TRANSMISCONTROLECONFORMITE,
          });
        } else if (payload?.transmission === EtatBonEnum.TRANSMISSIONLIQUIDATION) {
          this.repositorybon.save({
            ...(property as any), // existing fields
            etat: EtatBonEnum.TRANSMISSIONLIQUIDATION,
          });
        } else if (payload?.transmission === EtatBonEnum.TRANSMISSIONCONTROLEDEREGULARITE) {
          this.repositorybon.save({
            ...(property as any), // existing fields
            etat: EtatBonEnum.TRANSMISSIONCONTROLEDEREGULARITE,
          });
        } else if (payload?.transmission === EtatBonEnum.TRANSMISSIONACT) {
          this.repositorybon.save({
            ...(property as any), // existing fields
            etat: EtatBonEnum.TRANSMISSIONACT,
          });
        }

        let detailtrans = {
          ...(payload as any),
          bon_engagement: payload?.bon_engagement[i],
          transmission_reception: bon
        }
        const bont = await this.repositorydetail.save(detailtrans);
      }
    }
    return bon;
  }

  public async update(
    payload: TransmissionReceptionDTO,
    user: UserEntity,
  ): Promise<TransmissionReceptionEntity> {
    const id = payload.data[0]?.transmission_reception?.id
    const check = this.repository.findOne({
      id: id,
    });

    if (!check) {
      throw new NotFoundException();
    }

    var etated = '';
    if (payload?.action === 'reception') {
      console.log('reception', payload)
      etated = EtatBonEnum.RECEPTIONCONTROLECONFORMITE;
      this.repository.save({
        ...payload.data[0]?.transmission_reception, // existing fields
        objet: EtatBonEnum.RECEPTIONCONTROLECONFORMITE,
      });
      for (let i = 0; i < payload?.data?.length; i++) {
        const property = await this.repositorybon.findOne(payload?.data[i]?.bon_engagement?.id);
        this.repositorybon.save({
          ...(property as any), // existing fields
          etat: etated,
          updateBy: user
        });
      }

    } else if (payload?.action === 'rejet') {
      console.log('rejet', payload)
      const date = new Date();
      etated = EtatBonEnum.REJETCONTROLECONFORMITE
      const property = await this.repositorybon.findOne(payload?.data[0]?.bon_engagement?.id);
      this.repository.save({
        ...payload.data[0]?.transmission_reception, // existing fields
        objet: etated,
      });
      this.repositorybon.save({
        ...(property as any), // existing fields
        etat: etated,
        updateBy: user,
        rejet: true,
        dateRejet: date,
        motif: payload?.motif
      });

    } else if (payload?.action === 'controler') {
      console.log('controler', payload)
      etated = EtatBonEnum.CONTROLECONFORMITE
      const property = await this.repositorybon.findOne(payload?.data[0]?.bon_engagement?.id);
      console.log('avant ',property)
       const apres = this.repositorybon.save({
        ...(property as any),
        etat: etated,
        updateBy: user
      });
      console.log('apres ',apres)
      this.repository.save({
        ...payload.data[0]?.transmission_reception,
        objet: etated,

      });
    } else if (payload?.action === 'edition') {
      const date = new Date();
      etated = EtatBonEnum.EDITIONTITRECREANCE
      console.log('edition', payload)
      const property = await this.repositorybon.findOne(payload?.data[0]?.bon_engagement?.id);
      this.repository.save({
        ...payload.data[0]?.transmission_reception, // existing fields
        objet: etated,
      });
      this.repositorybon.save({
        ...(property as any), // existing fields
        etat: etated,
        dateEditionTCC: date,
        editionTCC: true,
        updateBy: user,
      });
    } else if (payload?.action === 'reception-borbereaux-regularite') {
      etated = EtatBonEnum.RECEPTIONCONTROLEREGULARITE
      console.log('reception-borbereaux-regularite', payload)
      const property = await this.repositorybon.findOne(payload?.data[0]?.bon_engagement?.id);
      this.repository.save({
        ...payload.data[0]?.transmission_reception, // existing fields
        objet: etated,
      });
      this.repositorybon.save({
        ...(property as any), // existing fields
        etat: etated,
        updateBy: user,
      });
    }else if (payload?.action === 'reception-liquidation') {
      etated = EtatBonEnum.RECEPTIONLIQUIDATION
      console.log('reception-liquidation', payload)
      const property = await this.repositorybon.findOne(payload?.data[0]?.bon_engagement?.id);
      this.repository.save({
        ...payload.data[0]?.transmission_reception, // existing fields
        objet: etated,
      });
      this.repositorybon.save({
        ...(property as any), // existing fields
        etat: etated,
        updateBy: user,
      });
    }else if (payload?.action === 'reception-regularite') {
      etated = EtatBonEnum.RECEPTIONACT
      console.log('reception-regularite', payload)
      const property = await this.repositorybon.findOne(payload?.data[0]?.bon_engagement?.id);
      this.repository.save({
        ...payload.data[0]?.transmission_reception, // existing fields
        objet: etated,
      });
      this.repositorybon.save({
        ...(property as any), // existing fields
        etat: etated,
        updateBy: user,
      });
    }

    return check;
  }

  public async getDossierBor(filter?: number): Promise<DetailTransmissionReceptionEntity[]> {
    console.log('detait resul ',filter)
   const detait = this.repositorydetail
      .createQueryBuilder('detail')
      .leftJoinAndSelect('detail.bon_engagement', 'bon_engagement')
      .leftJoinAndSelect('detail.transmission_reception', 'transmission_reception')
      .leftJoinAndSelect('bon_engagement.numActeJuridique', 'eng')
      .leftJoinAndSelect('bon_engagement.traitements', 'traitements')
      .leftJoinAndSelect('bon_engagement.paiements', 'paiements')
      .leftJoinAndSelect('bon_engagement.facture', 'facture')
      .leftJoinAndSelect('facture.articles', 'articles')
      .where(filter ? 'transmission_reception.id IN(:...codes)' : 'true', {
        codes: filter,
      })
      .getMany();
      console.log('detait resul ',detait)
    return detait
  }

  public async getBonEnAttente(filter?: EngagementFilter) {
    console.log('filter ', filter)
    var bons = await this.repositorybon
      .createQueryBuilder('bon')
      .leftJoinAndSelect('bon.numActeJuridique', 'eng')
      .where(filter?.etats ? 'bon.etat IN(:...codes)' : 'true', {
        codes: filter?.etats,
      })
      .andWhere(filter?.exercices ? 'eng.numero like :exercices' : 'true', {
        exercices: filter?.exercices,
      })
      .getMany();
    console.log("bons ", bons)

    var details = await this.repositorydetail
      .createQueryBuilder('detail')
      .leftJoinAndSelect('detail.bon_engagement', 'bon_engagement')
      .leftJoinAndSelect('bon_engagement.numActeJuridique', 'eng')
      .where(filter?.etats ? 'bon_engagement.etat IN(:...codes)' : 'true', {
        codes: filter?.etats,
      })
      .andWhere(filter?.exercices ? 'eng.numero like :exercices' : 'true', {
        exercices: filter?.exercices,
      })
      .getMany();
    console.log("details ", details)

    var result = bons.filter(function (o1) {
      return !details.some(function (o2) {
        return o1.id === o2.bon_engagement.id;
      });
    });
    console.log("result ", result)
    return bons;
  }
}
