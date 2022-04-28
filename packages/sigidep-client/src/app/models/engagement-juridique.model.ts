import { BaseModel } from './base.model';

export enum EtatEngagementEnum {
  SAVE = 'labels.save',
  MODIFY = 'labels.modify',
  RESERVED = 'labels.book',
  CANCEL = 'labels.cancel',
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
  public get isCommand() {
    return (
      this.codeProcedure === '1110' ||
      this.codeProcedure === '1111' ||
      this.codeProcedure === '1115'
    );
  }

  public get isMission() {
    return this.codeProcedure === '1121';
  }

  public get isDecision() {
    return !this.isCommand && !this.isMission;
  }
}
