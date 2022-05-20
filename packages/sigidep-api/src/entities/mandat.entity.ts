import { EtatMandatEnum } from '@utils/etat-mandat.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EngagementJuridiqueEntity } from './engagement-juridique.entity';
import { TraitementMandatEntity } from './traitement-mandat.entity';

@Entity({
  name: 'mandat',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class MandatEntity extends BaseEntity {
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

  @Column({ nullable: true, type: 'date', name: 'dateLiquidation' })
  public dateLiquidation: Date;

  @Column({ nullable: true, type: 'date', name: 'dateOrdonnancement' })
  public dateOrdonnancement: Date;

  @Column('varchar', { nullable: true, name: 'modePaiement' })
  public modePaiement: string;

  @Column('varchar', { nullable: true, name: 'compteADebiter' })
  public compteADebiter: string;

  @Column('varchar', { nullable: true, name: 'compteACrediter' })
  public compteACrediter: string;

  @Column({ nullable: true, type: 'date', name: 'datePaiement' })
  public datePaiement: Date;

  @Column('varchar', { nullable: true, name: 'villePaiement' })
  public villePaiement: string;

  @Column('varchar', { nullable: true, name: 'situationActuelle' })
  public situationActuelle: string;

  @Column({
    name: 'etat',
    type: 'enum',
    enum: EtatMandatEnum,
    nullable: true,
  })
  public etat: EtatMandatEnum;

  @OneToMany(() => TraitementMandatEntity, (object) => object.mandat, {
    cascade: true,
    eager: false,
    nullable: true,
  })
  public traitements?: Partial<TraitementMandatEntity>[];

  @Column({ nullable: true, type: 'boolean', name: 'rejet' })
  public rejet: boolean;

  @Column({ nullable: true, type: 'boolean', name: 'encours' })
  public encours: boolean;

  @Column({ nullable: true, type: 'boolean', name: 'ordonnance' })
  public ordonnance: boolean;

  @Column({ nullable: true, type: 'boolean', name: 'paye' })
  public paye: boolean;

  @ManyToOne(() => EngagementJuridiqueEntity, (object) => object.id, {
    cascade: true,
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'numActeJuridique' })
  public numActeJuridique: EngagementJuridiqueEntity;
}
