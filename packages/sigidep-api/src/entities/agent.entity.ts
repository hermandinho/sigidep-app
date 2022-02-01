import { GestionnairesEntity } from './gestionnaire.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Unique,
} from 'typeorm';
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

  @Column({ name: 'prenom', nullable: true })
  public prenom: string;

  @Column({ name: 'date_naissance', nullable: true, type: 'date' })
  public dateNaissance: Date;

  @Column({ name: 'lieu_naissance', nullable: true })
  public lieuNaissance: string;

  @Column({ name: 'ref_acte_recrutement', nullable: true })
  public refActeRecrutement: string;

  @Column({ name: 'date_recrutement', nullable: true, type: 'date' })
  public dateRecrutement: Date;

  @Column({ name: 'signataire_acte_recrutement', nullable: true })
  signataireActeRecrutement: string;

  @Column({ name: 'structure_rattach', nullable: true })
  public structureRattach: string;

  @Column({ name: 'service_rattach', nullable: true })
  public serviceRattach: string;

  @Column({ name: 'ref_acte_affectation', nullable: true })
  public refActeAffectation: string;

  @Column({ name: 'date_signature_affectation', nullable: true, type: 'date' })
  public dateSignAffectation: Date;

  @Column({ name: 'signataire_acte_affectation', nullable: true })
  public signataireActeAffectation: string;

  @Column({ name: 'poste_travail', nullable: true })
  public posteTravail: string;

  @Column({ name: 'fonction', nullable: true })
  public fonction: string;

  @Column({ name: 'ref_acte_nomination', nullable: true })
  public refActeNomination: string;

  @Column({ name: 'date_nomination', nullable: true, type: 'date' })
  public dateNomination: Date;

  @Column({ name: 'signataire_nomination', nullable: true })
  public signataireNomination: string;

  @Column({ name: 'echelon', nullable: true })
  public echelon: number;

  @Column({ name: 'indice', nullable: true })
  public indice: number;

  @Column({ name: 'date_sign_Nomination', type: 'date', nullable: true })
  public dateSignNomination: Date;

  @Column({ name: 'signataire_acte_nomination', nullable: true })
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

  @OneToOne(() => GestionnairesEntity, (object) => object.agent, {})
  public gestionnaire: GestionnairesEntity;
}
