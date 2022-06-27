import { ArticleModel } from './article.model';
import { BaseModel } from './base.model';
import { FactureModel } from './facture.model';

export class FactureArticleModel extends BaseModel {
  quantite!: number;
  facture!: FactureModel;
  article!: ArticleModel;

  constructor(param?: Partial<FactureArticleModel>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
