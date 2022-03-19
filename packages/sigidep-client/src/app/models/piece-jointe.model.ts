import { BaseModel } from './base.model';

export class PieceJointeModel extends BaseModel {
  code!: string;
  order!: number;
  label!: string;

  constructor(param: Partial<PieceJointeModel>) {
    super();
    Object.assign(this, param);
  }
}
