import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';
import { BaseModel } from './base.model';
import { EngagementJuridiqueModel } from './engagement-juridique.model';
import { FactureModel } from './facture.model';
import { TraitementBonEngagementModel } from './traitement-bon-engagement.model';

export type StepBonEngagement =
  | 'engagement'
  | 'bon'
  | 'perform'
  | 'situation'
  | 'facture';

export enum EtatBonEngagementEnum {
  ORDINAIRE = 'labels.ordinaire',
  EFFECTUER = 'labels.effectuer',
  CONTROLE = 'labels.controle',
}
export enum TypeMarcheBonEngagementEnum {
  AVANCE = 'labels.avance',
  DECOMPTE = 'labels.decompte',
  MARCHE = 'labels.marche',
}
export class BonEngagementModel extends BaseModel {
  numero!: string;
  matriculeGestionnaire!: string;
  nomGestionnaire!: string;
  objet!: string;
  dateEngagement!: Date;
  montantCPChiffres!: number;
  montantCPLettres!: string;
  dateLiquidation!: Date;
  dateOrdonnancement!: Date;
  modePaiement!: string;
  compteADebiter!: string;
  compteACrediter!: string;
  datePaiement!: Date;
  villePaiement!: string;
  etat!: EtatBonEnum;
  rejet!: boolean;
  encours!: boolean;
  ordonnance!: boolean;
  paye!: boolean;
  numActeJuridique!: EngagementJuridiqueModel;
  situationActuelle!: string;
  typeMarche!: TypeMarcheBonEngagementEnum;
  facture?: FactureModel;
  signataire!: string;
  traitements?: TraitementBonEngagementModel[];

  constructor(params?: Partial<BonEngagementModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
