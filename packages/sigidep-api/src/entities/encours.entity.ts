import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  @Column('varchar', { nullable: true })
  public subProgram: string;

  @Column('varchar', { nullable: true })
  public action: string;

  @Column('varchar', { nullable: true })
  public activity: string;

  @Column('varchar', { nullable: true })
  public task: string;

  @Column('varchar', { nullable: true })
  public adminUnit: string;

  @Column('varchar', { nullable: true })
  public paragraph: string;

  @Column('varchar', { nullable: true })
  public imputation: string;

  @Column('varchar', { nullable: true })
  public livrables: string;

  @Column('varchar', { nullable: true })
  public sourceVerif: string;

  @Column('varchar', { nullable: true })
  public gestionnaire: string;

  @Column('varchar', { nullable: true })
  public modeGestion: string;

  @Column('float', { nullable: true })
  public aeInitial: number;

  @Column('float', { nullable: true })
  public cpInitial: number;

  @Column('text', { nullable: true })
  public labelParagraphFr: string;

  @Column('text', { nullable: true })
  public labelParagraphEn: string;

  @Column('varchar', { nullable: true })
  public sourceFinancement: string;

  @Column('varchar', { nullable: true })
  public region: string;

  @Column('varchar', { nullable: true })
  public department: string;

  @Column('varchar', { nullable: true })
  public arrondissement: string;

  @Column('varchar', { nullable: true })
  public localite: string;

  @Column('varchar', { nullable: true })
  public unitePhysique: string;

  @Column('varchar', { nullable: true })
  public libelleUnitePhys: string;

  @Column('int', { nullable: true })
  public quantiteUnitePhysique: number;

  @Column('float', { nullable: true })
  public puUnitePhys: number;

  @Column('float', { nullable: true })
  public montantUnitePhys: number;

  @Column('float', { nullable: true })
  public aeInitRevisee: number;

  @Column('float', { nullable: true })
  public cpInitRevisee: number;

  @Column('float', { nullable: true })
  public aeDisponible: number;

  @Column('float', { nullable: true })
  public cpDisponible: number;

  @Column('float', { nullable: true })
  public aeDispoANouveau: number;

  @Column('float', { nullable: true })
  public cpDispoANouveau: number;

  @Column('float', { nullable: true })
  public valeurSeuil: number;

  @ManyToOne(
    () => SubProgramActivityTaskOperationEntity,
    (object) => object.id,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'operation_id' })
  operation: SubProgramActivityTaskOperationEntity;

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
