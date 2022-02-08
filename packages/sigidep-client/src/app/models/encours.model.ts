import {
  AdministrativeUnitModel,
  ArrondissementModel,
  DepartmentModel,
  ExerciseModel,
  RegionsModel,
  SubProgramActionModel,
  SubProgramActivityModel,
  SubProgramActivityTaskModel,
  SubProgramActivityTaskOperationModel,
  SubProgramModel,
} from '.';
import { BaseModel } from './base.model';
import { PhysicalUnitModel } from './physical-unit.entity';

export class EncoursModel extends BaseModel {
  exercise!: ExerciseModel;
  sousProgramme!: SubProgramModel;
  actions!: SubProgramActionModel[];
  activities!: SubProgramActivityModel[];
  tasks!: SubProgramActivityTaskModel[];
  operations!: SubProgramActivityTaskOperationModel[];
  imputations!: string[];
  adminUnits!: AdministrativeUnitModel[];
  livrables!: string[];
  sourceVerif!: string[];
  modeGestions!: string[];
  gestionnaires!: string[];
  regions!: RegionsModel[];
  departments!: DepartmentModel[];
  arrondissements!: ArrondissementModel[];
  localities!: string[];
  unitePhysiques!: PhysicalUnitModel[];
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
