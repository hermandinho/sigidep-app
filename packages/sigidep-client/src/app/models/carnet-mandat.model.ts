import { AgentModel, ExerciseModel } from '.';
import { BaseModel } from './base.model';

export class CarnetMandatModel extends BaseModel {
  code!: string;
  premierFeuillet?: string;
  dernierFeuillet?: string;
  gestionnaire!: AgentModel;
  dateAffectation?: Date;
  dateRetrait?: Date;
  matAgentRetrait?: string;
  nomAgentRetrait?: string;
  numCniAgentRetrait?: string;
  dateDelivranceCni?: Date;
  lieuDelivranceCni?: string;
  exercice!: ExerciseModel;

  constructor(params?: Partial<CarnetMandatModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
