import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CategorieAgentEntity } from './categorie-agent.entity';
import { GradeEntity } from './grade.entity';

@Entity({
  name: 'agents',
  orderBy: {
    matricule: 'ASC',
  },
})
@Unique('UQ_AGENTS_MATRICULE', ['matricule'])
export class AgentEntity extends BaseEntity {
  @Column({ name: 'matricule', nullable: false })
  public matricule: string;

  @Column({ name: 'nom', nullable: false })
  public nom: string;

  @Column({ name: 'prenom', nullable: false })
  public prenom: string;

  @Column({ name: 'date_naissance', nullable: false, type: 'date' })
  public dateNaissance: Date;

  @Column({ name: 'lieu_naissance', nullable: false })
  public lieuNaissance: string;

  @Column({ name: 'ref_acte_recrutement', nullable: false })
  public refActeRecrutement: string;

  @Column({ name: 'date_recrutement', nullable: false, type: 'date' })
  public dateRecrutement: Date;

  @Column({ name: 'signataire_acte_recrutement', nullable: false })
  signataireActeRecrutement: string;

  @Column({ name: 'structure_rattach', nullable: false })
  public structureRattach: string;

  @Column({ name: 'service_rattach', nullable: false })
  public serviceRattach: string;

  @Column({ name: 'ref_acte_affectation', nullable: false })
  public refActeAffectation: string;

  @Column({ name: 'date_signature_affectation', nullable: false, type: 'date' })
  public dateSignAffectation: Date;

  @Column({ name: 'signataire_acte_affectation', nullable: false })
  public signataireActeAffectation: string;

  @Column({ name: 'poste_travail', nullable: false })
  public posteTravail: string;

  @Column({ name: 'fonction', nullable: false })
  public fonction: string;

  @Column({ name: 'ref_acte_nomination', nullable: false })
  public refActeNomination: string;

  @Column({ name: 'date_nomination', nullable: false, type: 'date' })
  public dateNomination: Date;

  @Column({ name: 'signataire_nomination', nullable: false })
  public signataireNomination: string;

  @Column({ name: 'echelon', nullable: false })
  public echelon: number;

  @Column({ name: 'indice', nullable: false })
  public indice: number;

  @Column({ name: 'date_sign_Nomination', type: 'date', nullable: false })
  public dateSignNomination: Date;

  @Column({ name: 'signataire_acte_nomination', nullable: false })
  public signataireActeNomination: string;

  @ManyToOne(() => GradeEntity, (object) => object.id, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'grade' })
  public grade: GradeEntity;

  @ManyToOne(() => CategorieAgentEntity, (object) => object.id, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'categorie' })
  public categorie: CategorieAgentEntity;
}
