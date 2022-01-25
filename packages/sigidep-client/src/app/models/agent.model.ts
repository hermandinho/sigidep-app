import { BaseModel } from './base.model';
import { CategorieAgentModel } from './categorie-agent.model';
import { GradeModel } from './grade.model';

export class AgentModel extends BaseModel {
  matricule!: string;
  nom!: string;
  prenom?: string;
  dateNaissance?: Date;

  lieuNaissance?: string;
  refActeRecrutement?: string;
  dateRecrutement?: Date;

  signataireActeRecrutement?: string;
  structureRattach?: string;

  serviceRattach?: string;
  refActeAffectation?: string;
  dateSignAffectation?: Date;

  signataireActeAffectation?: string;

  posteTravail?: string;

  fonction?: string;
  refActeNomination?: string;

  dateNomination?: Date;
  signataireNomination?: string;
  echelon?: number;

  indice?: number;

  dateSignNomination?: Date;

  signataireActeNomination?: string;

  grade?: GradeModel;

  categorie?: CategorieAgentModel;

  constructor(params?: Partial<AgentModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
  public get nomComplet(): string {
    return this.nom + ' ' + this.prenom;
  }
}
