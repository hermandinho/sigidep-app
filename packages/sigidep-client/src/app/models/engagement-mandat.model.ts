import { EtatMandatEnum } from 'app/utils/etat-mandat.enum';
import { BaseModel } from './base.model';
import { EngagementMissionModel } from './engagement-mission.model';

export type StepMandat = 'engagement' | 'mandat' | 'perform';
export enum EtatEngagementMandatEnum {
  ORDINAIRE = 'labels.ordinaire',
  EFFECTUER = 'labels.effectuer',
  CONTROLE = 'labels.controle',
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
  numActeJuridique!: string;
  situationActuelle!: string;

  constructor(params?: Partial<EngagementMandatModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
