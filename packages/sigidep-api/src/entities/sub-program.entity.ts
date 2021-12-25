import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@entities/user.entity';
import { CreateSubProgramDto } from '@modules/sub-programs/dto/create-sub-program.dto';
import { ExerciseEntity } from '@entities/exercise.entity';
import { StructureEntity } from '@entities/structure.entity';
import { SubProgramActivityEntity } from '@entities/sub-program-activity.entity';

interface ISubProgramStrategy {
  labelFr: string;
  labelEn: string;
}

interface ISubProgramObjectiveIndicator {
  measurementUnit: string;
  labelFr: string;
  labelEn: string;
  referenceValue: number;
  referenceYear: number;
  targetValue: number;
  targetYear: number;
  verificationSourceFr: string;
  verificationSourceEn: string;
}

interface ISubProgramObjective {
  labelFr: string;
  labelEn: string;
  indicators: ISubProgramObjectiveIndicator[];
}

@Entity({
  name: 'sub_programs',
  orderBy: {
    id: 'ASC',
  },
})
export class SubProgramEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  @Column({ name: 'description_fr', nullable: false, type: 'text' })
  public presentationFr: string;

  @Column({ name: 'description_en', nullable: false, type: 'text' })
  public presentationEn: string;

  @Column({
    name: 'objectives',
    nullable: false,
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
  })
  public objectives: ISubProgramObjective[];

  @Column({
    name: 'strategies',
    nullable: false,
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
  })
  public strategies: ISubProgramStrategy;

  @Column({ name: 'engagement_authorization', nullable: true })
  public engagementAuthorization?: number;

  @Column({
    name: 'indicators_payment_credit_n1',
    nullable: true,
    comment:
      'Crédits de Paiement de l’indicateur du Sous-Programme à l’Exercice N+1',
  })
  public indicatorsPaymentCreditN1?: number;

  @Column({
    name: 'indicators_payment_credit_n2',
    nullable: true,
    comment:
      'Crédits de Paiement de l’indicateur du Sous-Programme à l’Exercice N+2',
  })
  public indicatorsPaymentCreditN2?: number;

  @Column({
    name: 'indicators_payment_credit_n3',
    nullable: true,
    comment:
      'Crédits de Paiement de l’indicateur du Sous-Programme à l’Exercice N+3',
  })
  public indicatorsPaymentCreditN3?: number;

  @Column({ name: 'start_date', nullable: false, type: 'date' })
  public startDate: Date;

  @Column({ name: 'end_date', nullable: false, type: 'date' })
  public endDate: Date;

  // RELATIONS
  @ManyToOne(() => UserEntity, (object) => object.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'owner_id' })
  owner?: UserEntity;

  @ManyToOne(() => UserEntity, (object) => object.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy?: UserEntity;

  @ManyToOne(() => ExerciseEntity, (object) => object.subPrograms, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: ExerciseEntity;

  @ManyToOne(() => StructureEntity, (object) => object.subPrograms, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn({ name: 'structure_id' })
  structure: StructureEntity;

  @OneToMany(() => SubProgramActivityEntity, (object) => object.subProgram)
  activities: SubProgramActivityEntity[];

  constructor(params?: Partial<SubProgramEntity | CreateSubProgramDto>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
