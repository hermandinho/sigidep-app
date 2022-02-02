import { BankModel } from './banque.model';
import { BaseModel } from './base.model';

export class AccreditationGestionnaireModel extends BaseModel {
  imputation!: string;
  labelOperation!: string;
  dateDebut!: Date;
  dateFin!: Date;

  constructor(param: Partial<AccreditationGestionnaireModel>) {
    super();
    Object.assign(this, param);
  }
}
