import { RubriqueModel } from '.';
import { ArticleModel } from './article.model';
import { BaseModel } from './base.model';

export class SousRubriqueModel extends BaseModel {
  code!: string;
  label?: string;
  rubrique!: RubriqueModel;
  articles?: ArticleModel[];

  constructor(param: Partial<SousRubriqueModel>) {
    super();
    Object.assign(this, param);
  }
}
