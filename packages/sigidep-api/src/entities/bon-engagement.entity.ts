import { EtatBonEnum } from '@utils/etat-bon.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { DetailTransmissionReceptionEntity } from './detail-transmission-reception.entity';
import { EngagementJuridiqueEntity } from './engagement-juridique.entity';
import { FactureEntity } from './facture.entity';
import { PaiementEntity } from './paiement.entity';
import { TraitementBonEngagementEntity } from './traitement-bon-engagement.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'bon_engagement',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class BonEngagementEntity extends BaseEntity {
  @Column({ name: 'numero', nullable: true })
  public numero: string;

  @Column('varchar', { nullable: true, name: 'matriculeGestionnaire' })
  public matriculeGestionnaire: string;

  @Column('varchar', { nullable: true, name: 'nomGestionnaire' })
  public nomGestionnaire: string;

  @Column({ nullable: true, type: 'text', name: 'objet' })
  public objet: string;

  @Column({ nullable: true, type: 'date', name: 'dateEngagement' })
  public dateEngagement: Date;

  @Column('varchar', { nullable: true, name: 'signataire' })
  public signataire: string;

  @Column({ nullable: true, type: 'float', name: 'montantCPChiffres' })
  public montantCPChiffres: number;

  @Column('varchar', { nullable: true, name: 'montantCPLettres' })
  public montantCPLettres: string;

  @Column('varchar', { nullable: true, name: 'situationActuelle' })
  public situationActuelle: string;

  @Column({ default: false, name: 'editionTCC' })
  public editionTCC: boolean;

  @Column({ type: 'date', default: '2000-01-01', name: 'dateEditionTCC' })
  public dateEditionTCC: Date;

  @Column({ type: 'date', default: '2000-01-01', name: 'dateRejet' })
  public dateRejet: Date;

  @Column({ name: 'rejet', default: false })
  public rejet: boolean;

  @Column({ default: false, name: 'encours' })
  public encours: boolean;
  @Column({
    name: 'etat',
    type: 'enum',
    enum: EtatBonEnum,
    nullable: true,
  })
  public etat: EtatBonEnum;

  @OneToMany(() => TraitementBonEngagementEntity, (object) => object.bon, {
    cascade: true,
    eager: false,
    nullable: true,
  })
  public traitements?: Partial<TraitementBonEngagementEntity>[];

  @ManyToOne(() => EngagementJuridiqueEntity, (object) => object.id, {
    cascade: true,
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'numActeJuridique' })
  public numActeJuridique: EngagementJuridiqueEntity;

  @OneToMany(() => PaiementEntity, (object) => object.bon, {
    cascade: true,
    eager: false,
    nullable: true,
  })
  public paiements?: Partial<PaiementEntity>[];

  // RELATIONS
  @ManyToOne(() => UserEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  public createdBy: UserEntity;

  @OneToOne(() => FactureEntity, (object) => object.bon, {
    eager: true,
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'facture_id' })
  public facture: FactureEntity | null;
  constructor(param?: Partial<BonEngagementEntity>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
