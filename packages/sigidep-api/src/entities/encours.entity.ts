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


  @Column('varchar', { nullable: true })
  public exerciseCode: string;

  @Column('varchar', { nullable: true, name: 'sous_programme' })
  public subProgram: string;

  @Column('varchar', { nullable: true })
  public active: string;

  @Column('varchar', { nullable: true, name: 'tache' })
  public task: string;

  @Column('varchar', { nullable: true, name: 'unites_administratives' })
  public administrativeUnit: string;

  @Column('varchar', { nullable: true, })
  public imputation: string;

  @Column('varchar', { nullable: true, name: 'libelle_operation_fr'})
  public operationLabelFr: string;

  @Column('varchar', { nullable: true, name: 'libelle_operation_en' })
  public operationLabelEn: string;

  @Column('varchar', { nullable: true, name: 'livrable_fr' })
  public livrableFr: string;

  @Column('text', { nullable: true, name: 'source_verification_fr' })
  public sourceVerificationFr: string;

  @Column('varchar', { nullable: true})
  public gestionnaire: string;

  @Column('varchar', { nullable: true, name: 'mode_gestion' })
  public modeGestion: string;

  @Column('float', { nullable: true, name: 'cp_initial' })
  public cpInitial: number;

  @Column('float', { nullable: true, name: 'ae_initial' })
  public aeInitial: number;

  @Column('varchar', { nullable: true, name: 'source_finencement' })
  public sourceFinencement: string;

  @Column('varchar', { nullable: true })
  public region: string;

  @Column('varchar', { nullable: true })
  public department: string;

  @Column('varchar', { nullable: true })
  public arrondissement: string;

  @Column('varchar', { nullable: true })
  public locality: string;

  @Column('varchar', { nullable: true, name: 'code_unite_physique' })
  public codeUnitePhysique: string;

  @Column('varchar', { nullable: true, name: 'libelle_unite_physique' })
  public labelUnitePhysique: string;

  @Column('varchar', { nullable: true, name: 'activite' })
  public activity: string;

  @Column('int', { nullable: true, name: 'qte_unite_physique' })
  public qteUnitePhysique: number;

  @Column('float', { nullable: true, name: 'pu_unite_physique' })
  public puUnitePhysique: string;

  @Column('float', { nullable: true, name: 'montant_unite_physique' })
  public amountUnitePhysique: string;

  @Column('varchar', { nullable: true })
  public operation: string;

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

  @Column('varchar', { nullable: true, name: 'actions' })
  public action: string

  /***
   * Statistiques mise en ligne
   */

  public nombreActions: number;

  public nombreActivites: number;

  public nombreTasks: number;

  public nombreOperations: number;

  public nombreImputations: number;

  public nombreUnitesPhysiques: number;

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


// -----------------------------------------------
  public exercise:ExerciseEntity
  @OneToOne(() => SubProgramEntity, (object) => object.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sub_program_id' })
  public sousProgramme: SubProgramEntity;

  // @OneToMany(() => SubProgramActionEntity, (object) => object.id, {
  //   eager: false,
  // })
  // public actions: SubProgramActionEntity[];

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
}
