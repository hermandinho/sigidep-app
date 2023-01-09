import { ArticleCrudModel } from './article-crud.model';
import { ArticleModel } from './article.model';
import { BaseModel } from './base.model';
import { BonEngagementModel } from './bon-engagement.model';

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
  mandat?: BonEngagementModel;
  articles!: ArticleModel[] | ArticleCrudModel[];

  constructor(params?: Partial<FactureModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
