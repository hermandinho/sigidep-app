import { ExerciseEntity } from '@entities/exercise.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { AgencesEntity, BanksEntity } from '.';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'contribuables_budgetaires',
  orderBy: {
    code: 'ASC',
  },
})
@Unique('UQ_CONTRIBUBALE-BUDGETAIRE_CODE', ['code'])
export class ContribuableBudgetaireEntity extends BaseEntity {
  @Column({ name: 'code', nullable: false })
  public code: string; //NIU

  @Column({ name: 'raison_sociale', nullable: false })
  public raisonSociale: string;

  @ManyToOne(() => ExerciseEntity, (object) => object.code, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'code_exercice' })
  public exercice?: ExerciseEntity;

  @ManyToOne(() => BanksEntity, (object) => object.code, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'code_banque' })
  public banque?: BanksEntity;

  @ManyToOne(() => AgencesEntity, (object) => object.code, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'code_agence' })
  public agence?: AgencesEntity;

  @Column({ name: 'numero_compte', nullable: false })
  public numeroCompte?: string;

  @Column({ name: 'cle', nullable: false })
  public cle?: string;
}
