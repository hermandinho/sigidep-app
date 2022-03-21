import { EngagementJuridiqueModel } from './engagement-juridique.model';

export class EngagementCommandeModel extends EngagementJuridiqueModel {
  montantTTC!: number;
  niuContribuable!: string;
  raisonSocialeContribuable!: string;
  codeBanqueContribuable!: string;
  codeAgenceContribuable!: string;
  numeroCompteContribuable!: string;
  cleCompteContribuable!: string;

  constructor(params?: Partial<EngagementCommandeModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}