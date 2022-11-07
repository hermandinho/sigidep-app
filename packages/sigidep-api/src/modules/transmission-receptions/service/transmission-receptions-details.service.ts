import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailTransmissionReceptionEntity } from '@entities/detail-transmission-reception.entity';
import { EngagementFilter } from '@utils/engagement-filter';

@Injectable()
export class TransmissionReceptionDetailService {
  constructor(
    @InjectRepository(DetailTransmissionReceptionEntity)
    private readonly repositorydetail: Repository<DetailTransmissionReceptionEntity>,
  ) {}

  public getRepository(): Repository<DetailTransmissionReceptionEntity> {
    return this.repositorydetail;
  }

  public async getDossierBor(
    filter?: EngagementFilter,
  ): Promise<DetailTransmissionReceptionEntity[]> {
    console.log('filter ', filter);
    const res = this.repositorydetail
      .createQueryBuilder('detail')
      .leftJoinAndSelect('detail.bon_engagement', 'bon_engagement')
      .leftJoinAndSelect(
        'detail.transmission_reception',
        'transmission_reception',
      )
      .leftJoinAndSelect('bon_engagement.numActeJuridique', 'eng')
      .leftJoinAndSelect('bon_engagement.traitements', 'traitements')
      .leftJoinAndSelect('bon_engagement.paiements', 'paiements')
      .leftJoinAndSelect('bon_engagement.facture', 'facture')
      .leftJoinAndSelect('facture.articles', 'articles')
      .where(filter?.ids ? 'detail.id IN(:...codes)' : 'true', {
        codes: filter?.ids,
      })
      .andWhere(filter?.etats ? 'bon_engagement.etat IN(:...etats)' : 'true', {
        etats: filter?.etats,
      })
      .andWhere(filter?.exercices ? 'eng.numero like :exercices' : 'true', {
        exercices: filter?.exercices,
      })
      .andWhere(
        filter?.objets ? 'transmission_reception.objet like :objets' : 'true',
        {
          objets: filter?.objets,
        },
      )
      .getMany();
    res.then((res) => console.log(res));
    return res;
  }
}
