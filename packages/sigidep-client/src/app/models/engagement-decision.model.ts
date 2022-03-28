import { EngagementJuridiqueModel } from './engagement-juridique.model';
import { ExecTaxesModel } from './exec-taxes.model';

export class EngagementDecisionModel extends EngagementJuridiqueModel {
  matriculeBeneficiaire!: string;
  nomBeneficiaire!: string;
  numContribBudget!: string;

  nomContribBudget!: string;
  codeUnitAdminBenef!: string;

  nomUnitAdminBenef!: string;
  montantBrut!: number;

  montantIRNC!: number;
  raisonSociale!: string;
  codeBanqueContribuable!: string;
  codeAgenceContribuable!: string;
  numeroCompteContribuable!: string;
  cleCompteContribuable!: string;
  tauxTVA!: number;
  tauxIR!: number;
  taxesApplicable!: ExecTaxesModel;

  netAPercevoir!: number;

  constructor(params?: Partial<EngagementDecisionModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
