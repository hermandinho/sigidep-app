import { BaseModel } from './base.model';

export class BaremeMissionModel extends BaseModel {
  montant!: number;

  constructor(param: Partial<BaremeMissionModel>) {
    super();
    Object.assign(this, param);
  }
}
