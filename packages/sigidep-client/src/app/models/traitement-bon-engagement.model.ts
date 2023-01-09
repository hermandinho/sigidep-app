import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';
import { BaseModel } from './base.model';
import { BonEngagementModel } from './bon-engagement.model';
import { PieceJointeModel } from './piece-jointe.model';
export type StepLiquidation =
  | 'rubrique'
  | 'piece'
  | 'mandater'

export class TraitementBonEngagementModel extends BaseModel {
  id!: number;
  bon!: BonEngagementModel;
  observation!: string;
  qteUnitePhysiqueReal!: number;
  montantTotalUnitPhysReal!: number;
  etat!: EtatBonEnum;
  dateLiquidation!: Date;
  numOrdreLiquidation!: number;
  rubriqueLiquidation!: string;
  montantLiquidation!: number;
  liquidation!: boolean;
  dateOrdonnancement!: Date;
  ordonnancement!: boolean;
  numOrdreOrdonnancement!: number;
  rubriqueOrdonnancement!: string;
  montantOrdonnancement!: number;
  motif!: string;
  piecesJointe!: PieceJointeModel;
  action!: string;
  numeroMandat!: string;
  matriculeGestionnaire!: string;
  nomGestionnaire!: string
  DecisionControleRegularite!: string
  motifRejetRegulariter!: string
  constructor(param?: Partial<TraitementBonEngagementModel>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
