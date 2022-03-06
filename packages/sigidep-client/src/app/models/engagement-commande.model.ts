import { EngagementJuridiqueModel } from './engagement-juridique.model';

export class EngagementCommandeModel extends EngagementJuridiqueModel {
  reference!: string;
  objet!: string;
  montantTTC!: number;

  constructor(params?: Partial<EngagementCommandeModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
