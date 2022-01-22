import { BaseModel } from './base.model';
import { SousRubriqueModel } from './sous-rubrique.model';

export class ArticleModel extends BaseModel {
  code!: string;
  serie!: string;
  designation!: string;
  conditionnement?: string;
  prix!: number;
  sousRubrique!: SousRubriqueModel;

  constructor(param: Partial<ArticleModel>) {
    super();
    Object.assign(this, param);
  }
}
