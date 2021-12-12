import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@entities/user.entity';
import { ReferencePhysicalUnitEntity } from '@entities/reference-physical-unit.entity';
import { SubProgramActivityTaskOperationEntity } from '@entities/sub-program-activity-task-operation.entity';

@Entity({
  name: 'sub_program_activity_task_operation_physical_units',
})
export class SubProgramActivityTaskOperationPhysicalUnitEntity extends BaseEntity {
  @Column({ name: 'quantity', default: 0 })
  public quantity: number;

  @Column({ name: 'unit_price', default: 0 })
  public unitPrice: number;

  @Column({ name: 'total_price', default: 0 })
  public totalPrice: number;

  // RELATIONS
  @ManyToOne(() => UserEntity, (object) => object.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy?: UserEntity;

  @ManyToOne(() => ReferencePhysicalUnitEntity, (object) => object.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'reference_physical_unit_id' })
  referencePhysicalUnit: Partial<ReferencePhysicalUnitEntity>;

  @ManyToOne(
    () => SubProgramActivityTaskOperationEntity,
    (object) => object.physicalUnits,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({ name: 'operation_id' })
  operation: SubProgramActivityTaskOperationEntity;

  constructor(
    params?: Partial<SubProgramActivityTaskOperationPhysicalUnitEntity>,
  ) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
