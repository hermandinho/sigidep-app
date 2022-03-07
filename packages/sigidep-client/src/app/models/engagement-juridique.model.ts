import {
  AdministrativeUnitModel,
  ExerciseModel,
  SubProgramActionModel,
  SubProgramActivityModel,
  SubProgramActivityTaskModel,
  SubProgramModel,
} from '.';
import { BaseModel } from './base.model';
import { ExecProcedureModel } from './exec-procedure.model';

export enum EtatEngagementEnum {
  SAVE = 'SAVE',
  MODIFY = 'MODIFY',
  RESERVED = 'RESERVED',
  CANCEL = 'CANCEL',
}

export class EngagementJuridiqueModel extends BaseModel {
  procedure!: ExecProcedureModel;

  exercise!: ExerciseModel;

  sousProgramme!: SubProgramModel;

  action!: SubProgramActionModel;

  activity!: SubProgramActivityModel;

  task!: SubProgramActivityTaskModel;

  reference!: string;

  numero!: number;

  imputation!: string;

  adminUnit!: AdministrativeUnitModel;

  montantAE!: number;

  etat!: EtatEngagementEnum;

  constructor(params?: Partial<EngagementJuridiqueModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
