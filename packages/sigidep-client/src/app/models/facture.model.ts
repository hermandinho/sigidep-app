import { ArticleCrudModel } from './article-crud.model';
import { ArticleModel } from './article.model';
import { BaseModel } from './base.model';
import { EngagementMandatModel } from './engagement-mandat.model';

export class FactureModel extends BaseModel {
  date!: Date;
  reference!: string;
  objet!: string;
  lignesArt!: string;
  tauxTVA!: number;
  tauxIR!: number;
  montantTTC!: number;
  montantHT!: number;
  montantTVA!: number;
  montantIR!: number;
  netAPercevoir!: number;
  surfracturation!: boolean;
  morcellement!: boolean;
  mandat?: EngagementMandatModel;
  articles!: ArticleModel[] | ArticleCrudModel[];

  constructor(params?: Partial<FactureModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
