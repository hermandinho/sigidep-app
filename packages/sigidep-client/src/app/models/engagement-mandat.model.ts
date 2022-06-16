import { EtatMandatEnum } from 'app/utils/etat-mandat.enum';
import { BaseModel } from './base.model';
import { EngagementJuridiqueModel } from './engagement-juridique.model';
import { EngagementMissionModel } from './engagement-mission.model';

export type StepMandat = 'engagement' | 'mandat' | 'perform' | 'situation' | 'facture';
export enum EtatEngagementMandatEnum {
  ORDINAIRE = 'labels.ordinaire',
  EFFECTUER = 'labels.effectuer',
  CONTROLE = 'labels.controle',
}
export enum TypeMarcheEngagementMandatEnum {
  AVANCE = 'labels.avance',
  DECOMPTE = 'labels.decompte',
  MARCHE = 'labels.marche',
}
export class EngagementMandatModel extends BaseModel {
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
  etat!: EtatMandatEnum;
  rejet!: boolean;
  encours!: boolean;
  ordonnance!: boolean;
  paye!: boolean;
  numActeJuridique!: EngagementJuridiqueModel;
  situationActuelle!: string;
  typeMarche!: TypeMarcheEngagementMandatEnum;

  constructor(params?: Partial<EngagementMandatModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}