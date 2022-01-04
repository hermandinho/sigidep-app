import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@entities/user.entity';
import { SubProgramActivityEntity } from '@entities/sub-program-activity.entity';
import { CreateSubProgramActivityTaskDto } from '@modules/sub-programs/dto/create-sub-program-activity-task.dto';
import { FinancialSourceEntity } from '@entities/financial-source.entity';
import { AdministrativeUnitEntity } from '@entities/administrative-unit.entity';
import { SubProgramActivityTaskOperationEntity } from '@entities/sub-program-activity-task-operation.entity';

@Entity({
  name: 'sub_program_activity_tasks',
  orderBy: {
    id: 'ASC',
  },
})
export class SubProgramActivityTaskEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  @Column({ name: 'stakeHolders_fr', nullable: false, type: 'text' })
  public stakeHoldersFr: string;

  @Column({ name: 'stakeHolders_en', nullable: false, type: 'text' })
  public stakeHoldersEn: string;

  // @Column({ name: 'objectives_fr', nullable: false, type: 'text' })
  // public objectivesFr: string;
  //
  // @Column({ name: 'objectives_en', nullable: false, type: 'text' })
  // public objectivesEn: string;

  @Column({ name: 'results_fr', nullable: false, type: 'text' })
  public resultsFr: string;

  @Column({ name: 'results_en', nullable: false, type: 'text' })
  public resultsEn: string;

  // @Column({ name: 'indicators_fr', nullable: false, type: 'text' })
  // public indicatorsFr: string;
  //
  // @Column({ name: 'indicators_en', nullable: false, type: 'text' })
  // public indicatorsEn: string;

  @Column({ name: 'verification_source_fr', nullable: false })
  public verificationSourceFr: string;

  @Column({ name: 'verification_source_en', nullable: false })
  public verificationSourceEn: string;

  // @Column({ name: 'reference_value', nullable: false })
  // public referenceValue: number;
  //
  // @Column({ name: 'reference_date', type: 'date', nullable: false })
  // public referenceYear: Date;
  //
  // @Column({ name: 'target_value', nullable: false })
  // public targetValue: number;
  //
  // @Column({ name: 'target_date', type: 'date', nullable: false })
  // public targetYear: Date;
  //
  // @Column({ name: 'measurement_unit', nullable: false })
  // public measurementUnit: string;

  // @Column({ name: 'is_multi_year', default: false })
  // public isMultiYear?: boolean;

  // @Column({ name: 'engagement_authorization', nullable: true })
  // public engagementAuthorization?: number;

  // @Column({ name: 'start_date', nullable: false, type: 'date' })
  // public startDate: Date;
  //
  // @Column({ name: 'end_date', nullable: false, type: 'date' })
  // public endDate: Date;

  // RELATIONS
  @ManyToOne(() => UserEntity, (object) => object.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy?: UserEntity;

  @ManyToOne(() => SubProgramActivityEntity, (object) => object.tasks, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'activity_id' })
  activity: SubProgramActivityEntity;

  @ManyToOne(() => FinancialSourceEntity, (object) => object.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'financial_source_id' })
  financialSource: FinancialSourceEntity;

  @ManyToOne(() => AdministrativeUnitEntity, (object) => object.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'administrative_unit_id' })
  administrativeUnit: AdministrativeUnitEntity;

  @OneToMany(
    () => SubProgramActivityTaskOperationEntity,
    (object) => object.task,
  )
  operations: SubProgramActivityTaskOperationEntity[];

  constructor(
    params?: Partial<
      SubProgramActivityTaskEntity | CreateSubProgramActivityTaskDto
    >,
  ) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
