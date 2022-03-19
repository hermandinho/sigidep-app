import { TypeProcedureModel } from '.';
import { BaseModel } from './base.model';

export class ExecProcedureModel extends BaseModel {
  typeProcedure!: TypeProcedureModel;
  matriculeAgent!: string;
  nomAgent!: string;
  numContribuable!: string;
  nomContribuable!: string;
  TxTVA!: number;
  TxIR!: number;
  RIB!: string;

  constructor(params?: Partial<ExecProcedureModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}

export enum TypeProcedureEnum {
  BCA,
  LC,
  MARCHE,
  MISSION,
  PRIME,
  RELEVE,
  MDAGENT,
  MDSTRUCTURE,
  DEBLOCAGE,
}
