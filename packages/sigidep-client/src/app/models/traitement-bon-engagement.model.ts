import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';
import { BaseModel } from './base.model';
import { BonEngagementModel } from './bon-engagement.model';

export class TraitementBonEngagementModel extends BaseModel {
  bon!: BonEngagementModel;
  observation!: string;
  qteUnitePhysiqueReal!: number;
  montantTotalUnitPhysReal!: number;
  etat!: EtatBonEnum;

  constructor(param?: Partial<TraitementBonEngagementModel>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
