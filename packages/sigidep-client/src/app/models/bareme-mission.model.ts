import { BaseModel } from './base.model';

export class BaremeMissionModel extends BaseModel {
  code!: string;
  montant!: number;

  constructor(param: Partial<BaremeMissionModel>) {
    super();
    Object.assign(this, param);
  }
}
