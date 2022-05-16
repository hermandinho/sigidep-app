import { IsOptional } from 'class-validator';
import { ChildEntity, Column, Entity, JoinColumn, ManyToOne, TableInheritance } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EngagementJuridiqueEntity } from './engagement-juridique.entity';
import { TraitementEntity } from './traitement.entity';

export enum EtatEngagementMandatDecissionEnum {
  SAVE = 'labels.save',
  MODIFY = 'labels.modify',
  RESERVED = 'labels.book',
  CANCEL = 'labels.cancel',
}
@Entity({
  name: 'engagement_mandat_decission',
  orderBy: {
    createdAt: 'DESC',
  },
})
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class EngagementMandatDecissionEntity extends BaseEntity {
 
  @Column({ name: 'numero', nullable: true})
  public numero: string;

  @Column('varchar', { nullable: true, name: 'matriculeGestionnaire' })
  public matriculeGestionnaire: string;

  @Column('varchar', { nullable: true, name: 'nomGestionnaire' })
  public nomGestionnaire: string;

  /* @Column('varchar', { nullable: true, name: 'numActeJuridique' })
  public numActeJuridique: string;
 */
  @Column({ nullable: true, type: 'text', name: 'objet' })
  public objet: string;

  @Column({nullable: true, type: 'date', name: 'dateEngagement' })
  public dateEngagement: Date;

  @Column('varchar', {nullable: true, name: 'signataire' })
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

  @Column('varchar', { nullable: true, name: 'etat' })
  public etat: string;

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
  @IsOptional()
  @JoinColumn({ name: 'numActeJuridique_id' })
  /** TO BE CHANGED TO Gestionnaire entity later, at least a Gestionnaire is an agent */
  public numActeJuridique?: EngagementJuridiqueEntity;

/*   @ManyToOne(() => TraitementEntity, (object) => object.id, {
    cascade: true,
    eager: false,
    nullable: true,
  })
  @IsOptional()
  @JoinColumn({ name: 'traitement_id' })
  public traitement?: TraitementEntity; */

}
