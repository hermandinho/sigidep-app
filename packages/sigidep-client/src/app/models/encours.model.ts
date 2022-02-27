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
  readonly nombreActions!: number;
  readonly nombreActivites!: number;
  readonly nombreTasks!: number;
  readonly nombreOperations!: number;
  readonly nombreImputations!: number;
  readonly nombreUnitesPhysiques!: number;
  readonly volumeAE!: number;
  readonly volumeCP!: number;


  paragraphLabellFr!: string;
  paragraphLabellEn!: string;
  paragraph!: string;
  codeUnitePhysique!: string;
  constructor(params?: Partial<EncoursModel>) {
    super();
    if (params) {
      Object.assign(this, params);
      this.nombreActions = params.actions?.length||0
      this.nombreActivites = params.activities?.length||0
      this.nombreTasks = params.tasks?.length||0
      this.nombreOperations = params.operations?.length||0
      this.nombreImputations = params.imputations?.length||0
      this.nombreUnitesPhysiques = params.unitePhysiques?.length||0
      this.volumeAE=10
      this.volumeCP=10
    }
  }
}
