import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@entities/user.entity';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { CreateSubProgramActivityDto } from '@modules/sub-programs/dto/create-sub-program-activity.dto';
import { SubProgramActivityTaskEntity } from '@entities/sub-program-activity-task.entity';
import { SubProgramActionEntity } from '@entities/sub-program-action.entity';

@Entity({
  name: 'sub_program_activities',
  orderBy: {
    id: 'ASC',
  },
})
export class SubProgramActivityEntity extends BaseEntity {
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

  @Column({ name: 'objectives_fr', nullable: false, type: 'text' })
  public objectivesFr: string;

  @Column({ name: 'objectives_en', nullable: false, type: 'text' })
  public objectivesEn: string;

  @Column({ name: 'results_fr', nullable: false, type: 'text' })
  public resultsFr: string;

  @Column({ name: 'results_en', nullable: false, type: 'text' })
  public resultsEn: string;

  @Column({ name: 'indicators_fr', nullable: false, type: 'text' })
  public indicatorsFr: string;

  @Column({ name: 'indicators_en', nullable: false, type: 'text' })
  public indicatorsEn: string;

  @Column({ name: 'verification_source_fr', nullable: false })
  public verificationSourceFr: string;

  @Column({ name: 'verification_source_en', nullable: false })
  public verificationSourceEn: string;

  @Column({ name: 'reference_value', nullable: false })
  public referenceValue: number;

  @Column({ name: 'reference_date', type: 'date', nullable: false })
  public referenceYear: Date;

  @Column({ name: 'target_value', nullable: false })
  public targetValue: number;

  @Column({ name: 'target_date', type: 'date', nullable: false })
  public targetYear: Date;

  @Column({ name: 'measurement_unit', nullable: false })
  public measurementUnit: string;

  @Column({ name: 'start_date', nullable: false, type: 'date' })
  public startDate: Date;

  @Column({ name: 'end_date', nullable: false, type: 'date' })
  public endDate: Date;

  // RELATIONS
  @ManyToOne(() => UserEntity, (object) => object.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy?: UserEntity;

  @ManyToOne(() => SubProgramActionEntity, (object) => object.activities, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'action_id' })
  action: SubProgramActionEntity;

  @OneToMany(() => SubProgramActivityTaskEntity, (object) => object.activity)
  public tasks: SubProgramActivityTaskEntity[];

  constructor(
    params?: Partial<SubProgramActivityEntity | CreateSubProgramActivityDto>,
  ) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
