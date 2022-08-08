import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailTransmissionReceptionEntity } from '@entities/detail-transmission-reception.entity';

@Injectable()
export class TransmissionReceptionDetailService {
  constructor(
    @InjectRepository(DetailTransmissionReceptionEntity)
    private readonly repositorydetail: Repository<DetailTransmissionReceptionEntity>,
  ) {}

  public getRepository(): Repository<DetailTransmissionReceptionEntity> {
    return this.repositorydetail;
  }


  public async getDossierBor(filter?:any):Promise<DetailTransmissionReceptionEntity[]>{
    return this.repositorydetail
      .createQueryBuilder('detail')
      .leftJoinAndSelect('detail.bon_engagement', 'bon_engagement')
      .leftJoinAndSelect('detail.transmission_reception', 'transmission_reception')
      .leftJoinAndSelect('bon_engagement.numActeJuridique', 'eng')
      .where(filter?.ids ? 'transmission_reception.id IN(:...codes)' : 'true', {
        codes: filter?.ids,
      })
      .andWhere(filter?.exercices ? 'eng.numero like :exercices' : 'true', {
        exercices: filter?.exercices,
      })
      .getMany();
  }
}