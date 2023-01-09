import { BaseModel } from './base.model';

export type StepPaiement = 'validation' | 'paiement';
export class PaiementModel extends BaseModel {
  id!: number;
  modePaiement!: string;
  dateValidACT!: string;
  compteADebiter!: string;
  bon!: string;
  compteACrediter!: string;
  datePaiement!: string;
  villePaiement!: string;
  paye!: boolean;
  validACT!: boolean;
  action!: string;
  numeroPaiement!: string;
  numeroCNI!: string;
  dateDelivrance!: string;
  lieuDelivrance!: string;

  constructor(param: Partial<PaiementModel>) {
    super();
    Object.assign(this, param);
  }
}
