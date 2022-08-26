import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { TransmissionReceptionEntity } from '@entities/transmission-reception.entity';
import { TransmissionReceptionDTO } from '../dto/transmission-receptions.dto';
import { EtatBonEnum } from '@utils/etat-bon.enum';
import { DetailTransmissionReceptionEntity } from '@entities/detail-transmission-reception.entity';
import { BonEngagementEntity } from '@entities/bon-engagement.entity';

@Injectable()
export class TransmissionReceptionService {
  constructor(
    @InjectRepository(TransmissionReceptionEntity)
    private readonly repository: Repository<TransmissionReceptionEntity>,

    @InjectRepository(DetailTransmissionReceptionEntity)
    private readonly repositorydetail: Repository<DetailTransmissionReceptionEntity>,

    @InjectRepository(BonEngagementEntity)
    private readonly repositorybon: Repository<BonEngagementEntity>,
  ) {}

  public getRepository(): Repository<TransmissionReceptionEntity> {
    return this.repository;
  }

  public async filter(filter?:any): Promise<TransmissionReceptionEntity[]> {
    return this.repository
      .createQueryBuilder('transmission')
      .where('transmission.objet = :name', {
        name: EtatBonEnum.TRANSMISCONTROLECONFORMITE,
      })
      .andWhere(filter?.exercices ? 'transmission.numero like :exercices' : 'true', {
        exercices: filter?.exercices,
      })
      .getMany();
  }

  public async cancel(id: number): Promise<TransmissionReceptionEntity> {
    this.getDossierBor(id).then((res:any)=>{
      for(let i=0; i<res?.length;i++){
        console.log(res[i]?.bon_engagement)
        const property = res[i]?.bon_engagement;
        this.repositorybon.save({
          ...property, // existing fields
          etat: EtatBonEnum.ANNULETRANSMISSIONCONTROLECONFORMITE, // annulation du bon
    
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
    //const val1: string = getAbbreviation(eng.adminUnit.slice(8));
    const val1: string = payload?.bon_engagement[0]?.numActeJuridique.exercise;
    const val2: string = ('0000000' + Number(count + 1)).slice(-7);

    payload.numero = val1 + 'B' + val2;
    let transPaylaod = {
      ...(payload as any),
      createdBy: user,
    };

    const bon = await this.repository.save(transPaylaod);

    if(payload){
      for(let i=0; i<payload?.bon_engagement?.length; i++){
        const property = payload?.bon_engagement[i];
        this.repositorybon.save({
          ...(property as any), // existing fields
          etat: EtatBonEnum.TRANSMISCONTROLECONFORMITE,
        });
        let detailtrans = {
          ...(payload as any),
          bon_engagement:payload?.bon_engagement[i],
          transmission_reception:bon
        }
        const bont = await this.repositorydetail.save(detailtrans);
      }
    }
    return bon;
  }

  public async update(
    payload: any,
    user: UserEntity,
  ): Promise<TransmissionReceptionEntity> {

    const check = await this.repository.findOne({
      id: payload?.data[0]?.transmission_reception?.id,
    });

    if (!check) {
      throw new NotFoundException();
    }
    var etated = '';
    if(payload?.action==='reception'){
       etated = EtatBonEnum.RECEPTIONCONTROLECONFORMITE
       for(let i=0; i<payload?.data?.length; i++){
        const property = payload?.data[i]?.bon_engagement;
        this.repositorybon.save({
          ...(property as any), // existing fields
          etat: etated,
          updateBy:user
        });
      }
    }else if(payload?.action==='rejet'){
       etated = EtatBonEnum.REJETCONTROLEREGULARITE
       const property = payload?.data[0]?.bon_engagement;
       this.repositorybon.save({
         ...(property as any), // existing fields
         etat: etated,
         updateBy:user
       });
    }else if(payload?.action==='controler'){
       etated = EtatBonEnum.CONTROLECONFORMITE
       const property = payload?.data?.bon_engagement;
       this.repositorybon.save({
         ...(property as any), // existing fields
         etat: etated,
         updateBy:user
       });
    }
   
    return check;
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
      .getMany();
  }

  public async getBonEnAttente(filter?:any){
    var bons= await this.repositorybon
    .createQueryBuilder('bon')
    .leftJoinAndSelect('bon.numActeJuridique', 'eng')
    .where('bon.etat = :name', {
      name: EtatBonEnum.RESERVE,
    })
    .andWhere(filter?.exercices ? 'eng.numero like :exercices' : 'true', {
      exercices: filter?.exercices,
    })
    .getMany();

    var details = await this.repositorydetail
    .createQueryBuilder('detail')
    .leftJoinAndSelect('detail.bon_engagement', 'bon_engagement')
    .leftJoinAndSelect('bon_engagement.numActeJuridique', 'eng')
    .getMany();
    
    var result = bons.filter(function(o1){
      return !details.some(function(o2){
          return o1.id === o2.bon_engagement.id;
      });
  });
    return result;
  }
}
