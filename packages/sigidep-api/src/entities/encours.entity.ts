import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import {
  AdministrativeUnitEntity,
  ArrondissementEntity,
  DepartmentEntity,
  ExerciseEntity,
  RegionEntity,
  SubProgramEntity,
} from '.';
import { BaseEntity } from './base.entity';
import { SubProgramActionEntity } from './sub-program-action.entity';
import { SubProgramActivityTaskOperationPhysicalUnitEntity } from './sub-program-activity-task-operation-physical-unit.entity';
import {
  managementModeEnum,
  SubProgramActivityTaskOperationEntity,
} from './sub-program-activity-task-operation.entity';
import { SubProgramActivityTaskEntity } from './sub-program-activity-task.entity';
import { SubProgramActivityEntity } from './sub-program-activity.entity';

@Entity({
  name: 'encours',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class EncoursEntity extends BaseEntity {
  @OneToOne(() => ExerciseEntity, (object) => object.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'exercise_id' })
  public exercise: ExerciseEntity;

  @OneToOne(() => SubProgramEntity, (object) => object.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sub_program_id' })
  public sousProgramme: SubProgramEntity;

  @OneToMany(() => SubProgramActionEntity, (object) => object.id, {
    eager: false,
  })
  public actions: SubProgramActionEntity[];

  @OneToMany(() => SubProgramActivityEntity, (object) => object.id, {
    eager: true,
  })
  public activities: SubProgramActivityEntity[];

  @OneToMany(() => SubProgramActivityTaskEntity, (object) => object.id, {
    eager: true,
  })
  public tasks: SubProgramActivityTaskEntity[];

  @OneToMany(
    () => SubProgramActivityTaskOperationEntity,
    (object) => object.id,
    { eager: true },
  )
  public operations: SubProgramActivityTaskOperationEntity[];

  @Column('varchar', { array: true, nullable: true })
  public imputations: string[];

  @OneToMany(() => AdministrativeUnitEntity, (object) => object.id, {
    eager: true,
  })
  public adminUnits: AdministrativeUnitEntity[];

  @Column('varchar', { array: true, nullable: true })
  public livrables: string[];

  @Column('varchar', { array: true, nullable: true })
  public sourceVerif: string[];

  @Column('varchar', { array: true, nullable: true })
  public modeGestions: managementModeEnum[];

  @Column('varchar', { array: true, nullable: true })
  public gestionnaires: string[];

  @OneToMany(() => RegionEntity, (object) => object.id, {
    eager: true,
  })
  public regions: RegionEntity[];

  @OneToMany(() => DepartmentEntity, (object) => object.id, {
    eager: true,
  })
  public departments: DepartmentEntity[];

  @OneToMany(() => ArrondissementEntity, (object) => object.id, {
    eager: true,
  })
  public arrondissements: ArrondissementEntity[];

  @Column('varchar', { array: true, nullable: true })
  public localities: string[];

  @OneToMany(
    () => SubProgramActivityTaskOperationPhysicalUnitEntity,
    (object) => object.id,
    {
      eager: true,
    },
  )
  public unitePhysiques: SubProgramActivityTaskOperationPhysicalUnitEntity[];

  @Column('varchar', { array: true, nullable: true })
  public libelleUnitePhys: string[];

  @Column('int', { array: true, nullable: true })
  public quantiteUnitePhys: number[];

  @Column('int', { array: true, nullable: true })
  public puUnitePhys: number[];

  @Column('int', { array: true, nullable: true })
  public montantUnitePhys: number[];

  @Column('int', { array: true, nullable: true })
  public aeInit: number[];

  @Column('int', { array: true, nullable: true })
  public cpInit: number[];

  @Column('int', { array: true, nullable: true })
  public cpInitRevisee: number[];

  @Column('int', { array: true, nullable: true })
  public aeInitRevisee: number[];

  @Column('int', { array: true, nullable: true })
  public aeDisponible: number[];

  @Column('int', { array: true, nullable: true })
  public cpDisponible: number[];

  @Column('int', { array: true, nullable: true })
  public aeEngagJuridique: number[];

  @Column('int', { array: true, nullable: true })
  public cpMandat: number[];

  @Column('int', { array: true, nullable: true })
  public aeDispoANouveau: number[];

  @Column('int', { array: true, nullable: true })
  public cpDispoANouveau: number[];

  @Column('float', { nullable: true })
  public valeurSeuil: number;

  /***
   * Statistiques mise en ligne
   */

  // @Column({ nullable: true })
  public nombreActions: number;

  // @Column({ nullable: true })
  public nombreActivites: number;

  // @Column({ nullable: true })
  public nombreTasks: number;

  // @Column({ nullable: true })
  public nombreOperations: number;

  // @Column({ nullable: true })
  public nombreImputations: number;

  // @Column({ nullable: true })
  public nombreUnitesPhysiques: number;

  // @Column({ nullable: true })
  public volumeAE: number;

  @Column({ nullable: true })
  public volumeCP: number;

  /**
   * Retouche sur l'entite
   */
  @Column('text',{ nullable: true })
  public paragraphLabellFr: string;

  @Column('text',{ nullable: true })
  public paragraphLabellEn: string;

  @Column('text',{ nullable: true })
  public paragraph: string;

  @Column('varchar',{ nullable: true })
  public codeUnitePhysique: string;
}
