import { AgenceModel, BankModel } from '.';
import { RegimeFiscalModel } from './regime-fiscal.model';

export class ContribuableModel {
  id!: number;
  code!: string;
  raisonSociale!: string;
  secteurActivite!: string;
  regimeFiscal!: RegimeFiscalModel;
  adresse!: string;
  quartier!: string;
  localisation!: string;
  siege!: string;
  ville!: string;
  contact!: string;
  email: string = '';
  banque!: BankModel;
  agence!: AgenceModel;
  numeroCompte!: string;
  cle!: number;

  constructor(param?: Partial<ContribuableModel>) {
    if (param) {
      Object.assign(this, param);
    }
  }
}
