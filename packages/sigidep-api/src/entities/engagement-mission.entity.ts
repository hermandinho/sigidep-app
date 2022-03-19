import { ChildEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaremeMissionEntity, EngagementJuridiqueEntity } from '.';

@ChildEntity({ name: 'engagement-mission' })
export class EngagementMissionEntity extends EngagementJuridiqueEntity {
  @Column()
  public numeroOM: string;

  @Column()
  public type: string;

  @Column()
  public matriculeBeneficiaire: string;

  @Column()
  public omBeneficiaire: string;

  @Column()
  public objet: string;

  @Column()
  public itineraire: string;

  @Column({ type: 'date' })
  public dateDebut: Date;

  @Column({ type: 'date' })
  public dateFin: Date;

  @Column({ type: 'int' })
  public nombreJours: number;

  @Column({ type: 'int' })
  public cumulJours: number;

  @ManyToOne(() => BaremeMissionEntity, (object) => object.id, {
    eager: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'bareme_id' })
  public BaremeJour: BaremeMissionEntity;

  @Column({ type: 'float' })
  public montant: number;

  @Column()
  public chevauchement: boolean;

  @Column()
  public quotaAtteint: boolean;
}
