/*
 * Built with ❣️ by El Manifico
 *
 * Email: hdemsongtsamo@gmail.com
 * Date: 1/7/22, 11:31 AM
 */

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@entities/user.entity';
import { SubProgramEntity } from '@entities/sub-program.entity';
import { CreateSubProgramActionDto } from '@modules/sub-programs/dto/create-sub-program-action.dto';
import { SubProgramActivityEntity } from '@entities/sub-program-activity.entity';

@Entity({
  name: 'sub_program_actions',
  orderBy: {
    id: 'ASC',
  },
})
export class SubProgramActionEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  @Column({ name: 'owner', nullable: false, comment: 'Responsable' })
  public owner: string;

  @Column({ name: 'objectives_fr', nullable: false, type: 'text' })
  public objectivesFr: string;

  @Column({ name: 'objectives_en', nullable: false, type: 'text' })
  public objectivesEn: string;

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

  @Column({ name: 'engagement_authorization', default: 0 })
  public engagementAuthorization: number;

  @Column({ name: 'cp_n1', default: 0 })
  public cpN1: number;

  @Column({ name: 'cp_n2', default: 0 })
  public cpN2: number;

  @Column({ name: 'cp_n3', default: 0 })
  public cpN3: number;

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

  @ManyToOne(() => SubProgramEntity, (object) => object.actions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'sub_program_id' })
  subProgram: SubProgramEntity;

  @OneToMany(() => SubProgramActivityEntity, (object) => object.action)
  activities: SubProgramActivityEntity[];

  constructor(
    params?: Partial<SubProgramActionEntity | CreateSubProgramActionDto>,
  ) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
