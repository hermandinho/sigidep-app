import { ChildEntity, Column, Entity, JoinColumn, ManyToOne, TableInheritance } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EngagementJuridiqueEntity } from './engagement-juridique.entity';

export enum TypeMissionEnum {
  AVANCE_MISSION_ORDINAIRE,
  AVANCE_MISSION_CONTROLE_RECOUVREMENT,
  MISSION_EFFECTUEE,
}
@ChildEntity({ name: 'engagement_mandat' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class EngagementMandatEntity extends BaseEntity {
 
  @Column({ name: 'Numero_Mandat', nullable: true, unique: true  })
  public NumeroMandat: string;

  @Column('varchar', { name: 'MatriculeGestionnaire_Mandat' })
  public MatriculeGestionnaireMandat: string;

  @Column({ type: 'text', name: 'Objet_Mandat' })
  public ObjetMandat: string;

  @Column({ type: 'date', name: 'DateEngagement_Mandat' })
  public DateEngagementMandat: Date;

  @Column({ type: 'float', name: 'MontantCP_Chiffres_Mandat' })
  public MontantCPChiffresMandat: number;

  @Column('varchar', { name: 'MontantCP_Lettres_Mandat' })
  public MontantCPLettresMandat: string;

  @Column({ type: 'date', name: 'DateLiquidation_Mandat' })
  public DateLiquidationMandat: Date;

  @Column({ type: 'date', name: 'DateOrdonnancement_Mandat' })
  public DateOrdonnancementMandat: Date;

  @Column('varchar', { name: 'ModePaiement_Mandat' })
  public ModePaiementMandat: string;

  @Column('varchar', { name: 'CompteADebiter_Mandat' })
  public CompteADebiterMandat: string;

  @Column('varchar', { name: 'CompteACrediter_Mandat' })
  public CompteACrediterMandat: string;

  @Column({ type: 'date', name: 'DatePaiement_Mandat' })
  public DatePaiementMandat: Date;

  @Column('varchar', { name: 'VillePaiement_Mandat' })
  public VillePaiementMandat: string;

  @Column('varchar', { name: 'Etat_Mandat' })
  public EtatMandat: string;

  @Column({ type: 'boolean', name: 'Rejet_Mandat' })
  public RejetMandat: boolean;

  @Column({ type: 'boolean', name: 'Encours_Mandat' })
  public EncoursMandat: boolean;

  @Column({ type: 'boolean', name: 'Ordonnance_Mandat' })
  public OrdonnanceMandat: boolean;

  @Column({ type: 'boolean', name: 'Paye_Mandat' })
  public PayeMandat: boolean;

  @ManyToOne(() => EngagementJuridiqueEntity, (object) => object.id, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @Column({ name: 'NumActeJuridique_Mandat' })
  public NumActeJuridiqueMandat: EngagementJuridiqueEntity;
}
