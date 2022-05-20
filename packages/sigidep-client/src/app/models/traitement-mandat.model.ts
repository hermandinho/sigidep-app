import { EtatMandatEnum } from 'app/utils/etat-mandat.enum';
import { MandatModel } from '.';
import { BaseModel } from './base.model';

export class TraitementMandatModel extends BaseModel {
  mandat!: MandatModel;
  observation!: string;
  qteUnitePhysiqueReal!: number;
  montantTotalUnitPhysReal!: number;
  etat!: EtatMandatEnum;

  constructor(param?: Partial<TraitementMandatModel>) {
    super();
    if (param) {
      Object.assign(this, param);
    }
  }
}
