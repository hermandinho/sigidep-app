import { NumberValueAccessor } from '@angular/forms';
import { BaseModel } from './base.model';

export enum EtatEngagementEnum {
  SAVE = 'SAVE',
  MODIFY = 'MODIFY',
  RESERVED = 'RESERVED',
  CANCEL = 'CANCEL',
}

export type Step = 'common' | 'mission' | 'decision' | 'command';

export class EngagementJuridiqueModel extends BaseModel {
  exercise!: string;
  codeProcedure!: string;
  reference!: string;
  dateSignature!: Date;
  signataire!: string;
  objet!: string;
  subProgram!: string;
  action!: string;
  activity!: string;
  task!: string;
  adminUnit!: string;
  paragraph!: string;
  imputation!: string;
  numero!: string;
  montantAE!: number;
  etat!: EtatEngagementEnum;
  operationId!: number;
  aeDisponible!: number;

  constructor(params?: Partial<EngagementJuridiqueModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
