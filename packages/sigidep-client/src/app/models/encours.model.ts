import { BaseModel } from './base.model';

export class EncoursModel extends BaseModel {
  exercise!: number;
  sousProgramme!: string;
  actions!: string[];
  activities!: string[];
  tasks!: string[];
  operations!: string[];
  imputations!: string[];
  adminUnits!: string[];
  livrables!: string[];
  sourceVerif!: string[];
  modeGestions!: string[];
  gestionnaires!: string[];
  regions!: string[];
  departments!: string[];
  arrondissements!: string[];
  localities!: string[];
  codeUnitePhysiques!: string[];
  libelleUnitePhys!: string[];
  quantiteUnitePhys!: number[];
  puUnitePhys!: number[];
  montantUnitePhys!: number[];
  aeInit!: number[];
  cpInit!: number[];
  cpInitRevisee!: number[];
  aeInitRevisee!: number[];

  aeDisponible!: number[];
  cpDisponible!: number[];
  aeEngagJuridique!: number[];
  cpMandat!: number[];
  aeDispoANouveau!: number[];
  cpDispoANouveau!: number[];
  valeurSeuil!: number;

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
    if (params) {
      Object.assign(this, params);
    }
  }
}
