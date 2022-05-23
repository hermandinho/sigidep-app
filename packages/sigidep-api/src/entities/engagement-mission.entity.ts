import { ChildEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaremeMissionEntity, EngagementJuridiqueEntity } from '.';

export enum TypeMissionEnum {
  AVANCE_MISSION_ORDINAIRE,
  AVANCE_MISSION_CONTROLE_RECOUVREMENT,
  MISSION_EFFECTUEE,
}
@ChildEntity({ name: 'engagement_mission' })
export class EngagementMissionEntity extends EngagementJuridiqueEntity {
  @Column({
    name: 'type_mission',
    nullable: true,
  })
  public typeMission: string;

  @Column({ name: 'matricule_beneficaire' })
  public matriculeBeneficiaire: string;

  @Column({ name: 'nom_beneficaire' })
  public nomBeneficiaire: string;

  @Column({ type: 'text', name: 'itineraire_mission' })
  public itineraire: string;

  @Column({ type: 'date', name: 'date_debut' })
  public dateDebut: Date;

  @Column({ type: 'date', name: 'date_fin' })
  public dateFin: Date;

  @Column({ type: 'int', name: 'nombre_jours' })
  public nombreJours: number;

  @ManyToOne(() => BaremeMissionEntity, (object) => object.id, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'bareme_id' })
  public baremeJour: BaremeMissionEntity;

  @Column({ type: 'float' })
  public montant: number;
}
