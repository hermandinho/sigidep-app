import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SubProgramActivityTaskOperationEntity } from './sub-program-activity-task-operation.entity';

@Entity({
  name: 'encours',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class EncoursEntity extends BaseEntity {
  @Column('varchar', { nullable: false })
  public exercise: string;

  @Column('varchar', { array: true, nullable: true })
  public subProgram: string[];

  @Column('varchar', { array: true, nullable: true })
  public action: string[];

  @Column('varchar', { array: true, nullable: true })
  public activity: string[];

  @Column('varchar', { array: true, nullable: true })
  public task: string[];

  @Column('varchar', { array: true, nullable: true })
  public adminUnit: string[];

  @Column('varchar', { array: true, nullable: true })
  public paragraph: string[];

  @Column('varchar', { array: true, nullable: true })
  public imputation: string[];

  @Column('varchar', { array: true, nullable: true })
  public operation: string[];

  @Column('varchar', { array: true, nullable: true })
  public livrables: string[];

  @Column('varchar', { array: true, nullable: true })
  public sourceVerif: string[];

  @Column('varchar', { nullable: true, name: 'unite_physique' })
  public unitePhysique: string;
  @Column('varchar', { array: true, nullable: true })
  public gestionnaire: string[];

  @Column('varchar', { array: true, nullable: true })
  public modeGestion: string[];

  @Column('float', { array: true, nullable: true })
  public aeInitial: number[];

  @Column('float', { array: true, nullable: true })
  public cpInitial: number[];

  @Column('text', { array: true, nullable: true })
  public labelParagraphFr: string[];

  @Column('text', { array: true, nullable: true })
  public labelParagraphEn: string[];

  @Column('varchar', { array: true, nullable: true })
  public sourceFinancement: string[];

  @Column('varchar', { array: true, nullable: true })
  public region: string[];

  @Column('varchar', { array: true, nullable: true })
  public department: string[];

  @Column('varchar', { array: true, nullable: true })
  public arrondissement: string[];

  @Column('varchar', { array: true, nullable: true })
  public localite: string[];

  @Column('varchar', { array: true, nullable: true })
  public libelleUnitePhys: string[];

  @Column('int', { array: true, nullable: true })
  public quantiteUnitePhysique: number[];

  @Column('float', { array: true, nullable: true })
  public puUnitePhys: number[];

  @Column('float', { array: true, nullable: true })
  public montantUnitePhys: number[];

  @Column('float', { array: true, nullable: true })
  public aeInitRevisee: number[];

  @Column('float', { array: true, nullable: true })
  public cpInitRevisee: number[];

  @Column('float', { array: true, nullable: true })
  public aeDisponible: number[];

  @Column('float', { array: true, nullable: true })
  public cpDisponible: number[];

  @Column('float', { array: true, nullable: true })
  public aeDispoANouveau: number[];

  @Column('float', { array: true, nullable: true })
  public cpDispoANouveau: number[];

  @Column('float', { nullable: true })
  public valeurSeuil: number;

  @OneToMany(() => SubProgramActivityTaskOperationEntity, (object) => object.id)
  operations: SubProgramActivityTaskOperationEntity[];

  /***
   * Statistiques mise en ligne, ces statistiques ne sont pas enregistrées en base de données
   */

  public nombreActions: number;

  public nombreActivites: number;

  public nombreTasks: number;

  public nombreOperations: number;

  public nombreImputations: number;

  public nombreUnitesPhysiques: number;
}
