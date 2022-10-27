import { Column, Entity, JoinColumn, ManyToOne, TableInheritance } from 'typeorm';
import { BaseEntity } from '.';
import { EncoursEntity } from './encours.entity';

export enum EtatEngagementEnum {
  SAVE = 'labels.save',
  MODIFY = 'labels.modify',
  RESERVED = 'labels.book',
  CANCEL = 'labels.cancel',
}

@Entity('engagement_juridique')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class EngagementJuridiqueEntity extends BaseEntity {
  @Column({ nullable: true, name: 'exercise' })
  public exercise: string;

  @Column({ nullable: true, name: 'code_procedure' })
  public codeProcedure: string;

  @Column({ nullable: true })
  public reference: string;

  @Column({ name: 'date_signature', nullable: true, type: 'date' })
  public dateSignature: Date;

  @Column({ nullable: true })
  public signataire: string;

  @Column('text', { nullable: true })
  public objet: string;

  @Column('varchar', { nullable: true })
  public subProgram: string;
  @Column('varchar', { nullable: true })
  public action: string;

  @Column('varchar', { nullable: true })
  public activity: string;

  @Column('varchar', { nullable: true })
  public task: string;

  @Column('varchar', { nullable: true })
  public adminUnit: string;

  @Column('varchar', { nullable: true })
  public paragraph: string;

  @Column('varchar', { nullable: true })
  public imputation: string;

  @Column({ nullable: true, unique: true })
  public numero: string;

  @Column({ type: 'float', nullable: false, name: 'montant_AE' })
  public montantAE: number;
  @Column({ type: 'float', nullable: true, name: 'montantAE_Reserve' })
  public montantAE_Reserve: number;

  @Column({
    name: 'etat',
    type: 'enum',
    enum: EtatEngagementEnum,
    nullable: true,
  })
  public etat: EtatEngagementEnum;

  @Column({ nullable: false, name: 'operation_id' })
  public operationId: number;

  @Column({ nullable: true, name: 'ae_disponible' })
  aeDisponible!: number;
}
