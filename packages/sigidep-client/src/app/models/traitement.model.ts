import { BaseModel } from './base.model';

export class TraitementModel extends BaseModel {
  codeEtape!: number;
  label!: string;

  constructor(param?: Partial<TraitementModel>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
