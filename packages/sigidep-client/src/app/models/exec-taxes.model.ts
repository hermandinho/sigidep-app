import { BaseModel } from './base.model';

export class ExecTaxesModel extends BaseModel {
  code!: string;
  label!: string;
  TxTVA!: number;
  TxIR!: number;

  constructor(params?: Partial<ExecTaxesModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
