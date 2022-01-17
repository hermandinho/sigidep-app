import { BankModel } from './banque.model';
import { BaseModel } from './base.model';

export class AgenceModel extends BaseModel {
  code!: string;
  label!: string;

  bank!: BankModel;

  constructor(param: Partial<AgenceModel>) {
    super();
    Object.assign(this, param);
  }
}
