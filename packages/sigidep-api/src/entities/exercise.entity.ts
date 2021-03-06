import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@entities/user.entity';
import { SubProgramEntity } from '@entities/sub-program.entity';

export enum ExerciseStatusEnum {
  HIDDEN = 'hidden', // Used when creating an Exercise automatically
  PREPARING = 'preparing',
  IN_PROGRESS = 'in_progress',
  FOLLOWING = 'following',
  ARCHIVED = 'archived',
}

@Entity({
  name: 'exercices',
  orderBy: {
    code: 'DESC',
  },
})
export class ExerciseEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  // @Generated('increment')
  public code?: number;

  @Column({ name: 'year', type: 'int', default: new Date().getFullYear() })
  public year: Date;

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

  // Relations
  @ManyToOne(() => UserEntity, (object) => object.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'owner_id' })
  public createdBy!: UserEntity;

  @OneToMany(() => SubProgramEntity, (object) => object.exercise)
  subPrograms: SubProgramEntity[];
}
