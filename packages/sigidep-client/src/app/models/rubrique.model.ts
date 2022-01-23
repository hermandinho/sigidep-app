import { BaseModel } from './base.model';
import { SousRubriqueModel } from './sous-rubrique.model';

export class RubriqueModel extends BaseModel {
  code!: string;
  label?: string;
  sousRubriques?: SousRubriqueModel[];

  constructor(param: Partial<RubriqueModel>) {
    super();
    Object.assign(this, param);
  }
}
