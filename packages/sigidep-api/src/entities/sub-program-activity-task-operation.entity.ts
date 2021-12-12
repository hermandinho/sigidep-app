import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@entities/user.entity';
import { SubProgramActivityTaskEntity } from '@entities/sub-program-activity-task.entity';
import { ArrondissementEntity } from '@entities/arrondissement.entity';
import { RegionEntity } from '@entities/region.entity';
import { ParagraphEntity } from '@entities/paragraph.entity';
import { SubProgramActivityTaskOperationPhysicalUnitEntity } from '@entities/sub-program-activity-task-operation-physical-unit.entity';
import { CreateSubProgramActivityTaskOperationDto } from '@modules/sub-programs/dto/create-sub-program-activity-task-operation.dto';
import { DepartmentEntity } from '@entities/department.entity';

export enum managementModeEnum {
  GC = 'gc',
  CD = 'cd',
  RT = 'rt',
}

interface IChronogram {
  label: string;
  value: number;
}

@Entity({
  name: 'sub_program_activity_task_operations',
})
export class SubProgramActivityTaskOperationEntity extends BaseEntity {
  // @Column({ name: 'code', nullable: true })
  // public code?: string;

  @Column({ name: 'label_en', nullable: false })
  public labelEn: string;

  @Column({ name: 'label_fr', nullable: false })
  public labelFr: string;

  @Column({ name: 'credit_n1', default: 0 })
  public paymentCreditN1: number;

  @Column({ name: 'credit_n2', default: 0 })
  public paymentCreditN2: number;

  @Column({ name: 'credit_n3', default: 0 })
  public paymentCreditN3: number;

  @Column({ name: 'engagement_authorization', default: 0 })
  public engagementAuthorization: number;

  @Column({ name: 'deliverable_en', nullable: false, type: 'text' })
  public deliverablesEn: string;

  @Column({ name: 'deliverable_fr', nullable: false, type: 'text' })
  public deliverablesFr: string;

  @Column({ name: 'verification_source_fr', nullable: false })
  public verificationSourceFr: string;

  @Column({ name: 'verification_source_en', nullable: false })
  public verificationSourceEn: string;

  @Column({ name: 'manager_name', nullable: false })
  public managerName: string;

  @Column({ name: 'imputation', nullable: false })
  public imputation: string;

  @Column({
    name: 'chronogram',
    nullable: false,
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
  })
  public chronogram: IChronogram[];

  @Column({
    name: 'management_mode',
    nullable: false,
    type: 'enum',
    enum: managementModeEnum,
  })
  public managementMode: managementModeEnum;

  @Column({ name: 'locality', nullable: false })
  public locality: string;

  // RELATIONS
  @ManyToOne(() => UserEntity, (object) => object.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy?: UserEntity;

  @ManyToOne(
    () => SubProgramActivityTaskEntity,
    (object) => object.operations,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({ name: 'task_id' })
  task: SubProgramActivityTaskEntity;

  @ManyToOne(() => ArrondissementEntity, (object) => object.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'arrondissement_id' })
  arrondissement: ArrondissementEntity;

  @ManyToOne(() => DepartmentEntity, (object) => object.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(() => RegionEntity, (object) => object.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @ManyToOne(() => ParagraphEntity, (object) => object.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'paragraph_id' })
  paragraph: ParagraphEntity;

  @OneToMany(
    () => SubProgramActivityTaskOperationPhysicalUnitEntity,
    (object) => object.operation,
    { onDelete: 'CASCADE' },
  )
  public physicalUnits: SubProgramActivityTaskOperationPhysicalUnitEntity[];

  constructor(
    params?: Partial<
      | SubProgramActivityTaskOperationEntity
      | CreateSubProgramActivityTaskOperationDto
    >,
  ) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
