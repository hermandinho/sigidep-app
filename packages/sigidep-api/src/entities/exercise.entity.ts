import { Column, Entity, Generated } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum ExerciseStatusEnum {
  HIDDEN = 'hidden', // Used when creating an Exercise automatically
  PREPARING = 'preparing',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

@Entity({
  name: 'exercices',
  orderBy: {
    code: 'ASC',
  },
})
export class ExerciseEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  @Generated('increment')
  public code?: number;

  @Column({ name: 'start_date', type: 'date', nullable: false })
  public startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: false })
  public endDate: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ExerciseStatusEnum,
    default: ExerciseStatusEnum.PREPARING,
  })
  public status: ExerciseStatusEnum;
}
