import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  TableInheritance,
} from 'typeorm';
import {
  AdministrativeUnitEntity,
  ExerciseEntity,
  SubProgramEntity,
  BaseEntity,
} from '.';
import { SubProgramActivityEntity } from './sub-program-activity.entity';
import { SubProgramActivityTaskEntity } from './sub-program-activity-task.entity';
import { SubProgramActionEntity } from './sub-program-action.entity';
import { ExecProcedureEntity } from './exec-procedure.entity';

export enum EtatEngagementEnum {
  SAVE = 'SAVE',
  MODIFY = 'MODIFY',
  RESERVED = 'RESERVED',
  CANCEL = 'CANCEL',
}

@Entity('engagementjuridiques')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class EngagementJuridiqueEntity extends BaseEntity {
  @ManyToOne(() => ExecProcedureEntity, (object) => object.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'procedure_id' })
  public procedure: ExecProcedureEntity;

  @ManyToOne(() => ExerciseEntity, (object) => object.id, {
    eager: true,
    nullable: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'exercise_id' })
  public exercise: ExerciseEntity;

  @ManyToOne(() => SubProgramEntity, (object) => object.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sub_program_id' })
  public sousProgramme: SubProgramEntity;

  @ManyToOne(() => SubProgramActionEntity, (object) => object.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'action_id' })
  public action: SubProgramActionEntity;

  @ManyToOne(() => SubProgramActivityEntity, (object) => object.id, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'activity_id' })
  public activity: SubProgramActivityEntity;

  @ManyToOne(() => SubProgramActivityTaskEntity, (object) => object.id, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'task_id' })
  public task: SubProgramActivityTaskEntity;

  @Column({ nullable: true })
  public reference: string;

  @Column({ nullable: true })
  public numero: number;

  @Column({ nullable: true })
  public imputation: string;

  @ManyToOne(() => AdministrativeUnitEntity, (object) => object.id, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'admin_unit_id' })
  public adminUnit: AdministrativeUnitEntity;

  @Column({ type: 'float', nullable: false })
  public montantAE: number;

  @Column({
    name: 'etat',
    type: 'enum',
    enum: EtatEngagementEnum,
    default: EtatEngagementEnum.SAVE,
    nullable: false,
  })
  public etat: EtatEngagementEnum;
}
