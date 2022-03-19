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
  public exerciseCode!: string;
  public subProgram!: string;
  public active!: string;
  public task!: string;
  public administrativeUnit!: string;
  public imputation!: string;
  public operationLabelFr!: string;
  public operationLabelEn!: string;
  public livrableFr!: string;
  public sourceVerificationFr!: string;
  public gestionnaire!: string;
  public modeGestion!: string;
  public cpInitial!: number;
  public aeInitial!: number;
  public sourceFinencement!: string;
  public region!: string;
  public department!: string;
  public arrondissement!: string;
  public locality!: string;
  public codeUnitePhysique!: string;
  public labelUnitePhysique!: string;
  public qteUnitePhysique!: number;
  public puUnitePhysique!: string;
  public amountUnitePhysique!: string;
  public operation!: string;
  public action!: string;

  //------------------------------------------------------
  exercise!: ExerciseModel;
  sousProgramme!: SubProgramModel;
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
  activity!: string;

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

  actions!: any[];

  paragraphLabellFr!: string;
  paragraphLabellEn!: string;
  paragraph!: string;
  constructor(params?: Partial<EncoursModel>) {
    super();
    if (params) {
      Object.assign(this, params);
      this.nombreActivites = params.activities?.length || 0;
      this.nombreTasks = params.tasks?.length || 0;
      this.nombreOperations = params.operations?.length || 0;
      this.nombreImputations = params.imputations?.length || 0;
      this.nombreUnitesPhysiques = params.unitePhysiques?.length || 0;
      this.volumeAE = 10;
      this.volumeCP = 10;
    }
  }
}
