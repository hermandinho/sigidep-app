import { AgentModel, ExerciseModel } from '.';
import { BaseModel } from './base.model';
import { BonEngagementModel } from './bon-engagement.model';
export type StepTransmission =
  | 'constitution'
  | 'bordereau';
export class TransmissionsReceptionModel extends BaseModel {
  numero!: string;
  objet?: string;
  serviceSource?: string;
  serviceDestination!: string;
  lieu?: string;
  bon_engagement?: BonEngagementModel[];
  constructor(params?: Partial<TransmissionsReceptionModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
