import { AccreditationGestionnaireModel } from '@models/accreditation-gestionnaire.model';
import { AgentModel } from '@models/agent.model';
import { BaseModel } from './base.model';

export class GestionnaireModel extends BaseModel {
  matricule!: string;
  nom!: string;
  prenom!: string;
  fonction!: string;

  agent!: AgentModel;
  accreditations!: AccreditationGestionnaireModel[];

  constructor(param: Partial<GestionnaireModel>) {
    super();
    Object.assign(this, param);
  }
}
