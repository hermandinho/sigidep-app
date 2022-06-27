import { BaseModel } from './base.model';
import { SousRubriqueModel } from './sous-rubrique.model';

export class ArticleCrudModel extends BaseModel {
  code!: string;
  serie!: string;
  designation!: string;
  conditionnement?: string;
  prix!: number;
  quantite!: number;
  sousRubrique!: SousRubriqueModel;

  constructor(param: Partial<ArticleCrudModel>) {
    super();
    Object.assign(this, param);
  }
}
