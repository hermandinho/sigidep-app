import { SubProgramActivityTaskOperationModel } from '.';
import { BaseModel } from './base.model';

export class EncoursModel extends BaseModel {
  exercise!: string;
  subProgram!: string;
  action!: string;
  activity!: string;
  task!: string;
  adminUnit!: string;
  paragraph!: string;
  imputation!: string;
  livrables!: string;
  sourceVerif!: string;
  gestionnaire!: string;
  modeGestion!: string;
  aeInitial!: number;
  cpInitial!: number;
  labelParagraphFr!: string;
  labelParagraphEn!: string;
  sourceFinancement!: string;
  region!: string;
  department!: string;
  arrondissement!: string;
  localite!: string;
  unitePhysique!: string;
  libelleUnitePhys!: string;
  quantiteUnitePhysique!: number;
  puUnitePhys!: number;
  montantUnitePhys!: number;
  aeInitRevisee!: number;
  cpInitRevisee!: number;
  aeDisponible!: number;
  cpDisponible!: number;
  aeDispoANouveau!: number;
  cpDispoANouveau!: number;
  valeurSeuil!: number;
  operation!: SubProgramActivityTaskOperationModel;

  /***
   * Statistiques mise en ligne
   */
  nombreActions!: number;
  nombreActivites!: number;
  nombreTasks!: number;
  nombreOperations!: number;
  nombreImputations!: number;
  nombreUnitesPhysiques!: number;
  volumeAE!: number;
  volumeCP!: number;
  constructor(params?: Partial<EncoursModel>) {
    super();
    if (params?.operation) {
      Object.assign(this, params);
    }
  }
}
