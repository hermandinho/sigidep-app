import { EngagementJuridiqueModel } from './engagement-juridique.model';

export class EngagementDecisionModel extends EngagementJuridiqueModel {
  numeroDecision!: string;

  dateSignature!: Date;

  objet!: string;

  nomSignataire!: string;

  matriculeBeneficiaire!: string;

  nomBeneficiaire!: string;

  numContribBudget!: string;

  nomContribBudget!: string;

  montantHT!: number;

  montantTaxe!: number;

  montantTTC!: number;

  netAPercevoir!: number;

  constructor(params?: Partial<EngagementDecisionModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
