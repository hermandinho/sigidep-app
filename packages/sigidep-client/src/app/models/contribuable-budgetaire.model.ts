import { ExerciseModel } from '@models/exercise.model';
import { AgenceModel, BankModel } from '.';

export class ContribuableBugetaireModel {
  id!: number;
  code!: string;
  raisonSociale!: string;
  exercice!: ExerciseModel;
  banque!: BankModel;
  agence!: AgenceModel;
  numeroCompte!: string;
  cle!: number;

  constructor(param?: Partial<ContribuableBugetaireModel>) {
    if (param) {
      Object.assign(this, param);
    }
  }
}
