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
  exerciseCode!: string;
  subProgram!: string;
  active!: string;
  task!: string;
  administrativeUnit!: string;
  imputation!: string;
  operationLabelFr!: string;
  operationLabelEn!: string;
  livrableFr!: string;
  sourceVerificationFr!: string;
  gestionnaire!: string;
  modeGestion!: string;
  cpInitial!: number;
  aeInitial!: number;
  sourceFinencement!: string;
  region!: string;
  department!: string;
  arrondissement!: string;
  locality!: string;
  codeUnitePhysique!: string;
  labelUnitePhysique!: string;
  qteUnitePhysique!: number;
  puUnitePhysique!: string;
  amountUnitePhysique!: string;
  operation!: string;
  action!: string;
  operations!: SubProgramActivityTaskOperationModel[];


//------------------------------------------------------

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
      this.volumeAE=10
      this.volumeCP=10
    }
  }
}
