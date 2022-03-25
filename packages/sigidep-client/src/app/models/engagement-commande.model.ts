import { EngagementJuridiqueModel } from './engagement-juridique.model';
import { ExecTaxesModel } from './exec-taxes.model';

export class EngagementCommandeModel extends EngagementJuridiqueModel {
  niuContribuable!: string;
  raisonSociale!: string;
  codeBanqueContribuable!: string;
  codeAgenceContribuable!: string;
  numeroCompteContribuable!: string;
  cleCompteContribuable!: string;
  montantTTC!: number;
  tauxTVA!: number;
  taxesApplicable!: ExecTaxesModel;
  constructor(params?: Partial<EngagementCommandeModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
