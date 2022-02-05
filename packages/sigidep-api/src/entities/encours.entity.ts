import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'encours',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class EncoursEntity extends BaseEntity {
  @Column({ nullable: false })
  public exercise: number;

  @Column({ nullable: true })
  public sousProgramme: string;

  @Column('varchar', { array: true, nullable: true })
  public actions: string[];

  @Column('varchar', { array: true, nullable: true })
  public activities: string[];

  @Column('varchar', { array: true, nullable: true })
  public tasks: string[];

  @Column('varchar', { array: true, nullable: true })
  public operations: string[];

  @Column('varchar', { array: true, nullable: true })
  public imputations: string[];

  @Column('varchar', { array: true, nullable: true })
  public adminUnits: string[];

  @Column('varchar', { array: true, nullable: true })
  public livrables: string[];

  @Column('varchar', { array: true, nullable: true })
  public sourceVerif: string[];
  @Column('varchar', { array: true, nullable: true })
  public modeGestions: string[];

  @Column('varchar', { array: true, nullable: true })
  public gestionnaires: string[];

  @Column('varchar', { array: true, nullable: true })
  public regions: string[];

  @Column('varchar', { array: true, nullable: true })
  public departments: string[];

  @Column('varchar', { array: true, nullable: true })
  public arrondissements: string[];

  @Column('varchar', { array: true, nullable: true })
  public localities: string[];

  @Column('varchar', { array: true, nullable: true })
  public codeUnitePhysiques: string[];

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

  @Column({ nullable: true })
  public nombreActions: number;

  @Column({ nullable: true })
  public nombreActivites: number;

  @Column({ nullable: true })
  public nombreTasks: number;

  @Column({ nullable: true })
  public nombreOperations: number;

  @Column({ nullable: true })
  public nombreImputations: number;

  @Column({ nullable: true })
  public nombreUnitesPhysiques: number;

  @Column({ nullable: true })
  public volumeAE: number;

  @Column({ nullable: true })
  public volumeCP: number;
}
