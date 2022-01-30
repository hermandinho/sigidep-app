import { BaseModel } from './base.model';

export class TypeProcedureModel extends BaseModel {
  code!: string;
  label!: string;

  constructor(param: Partial<TypeProcedureModel>) {
    super();
    Object.assign(this, param);
  }
}
