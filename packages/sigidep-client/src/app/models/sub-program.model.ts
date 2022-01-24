import { UserModel } from '@models/user.model';
import { FinancialSourceModel } from '@models/financial-source.model';
import { ExerciseModel } from '@models/exercise.model';
import { AdministrativeUnitModel } from '@models/administrative-unit.model';
import { ParagraphModel } from '@models/paragraph.model';
import {
  ArrondissementModel,
  DepartmentModel,
  RegionsModel,
} from '@models/addresses.model';
import { StructureModel } from '@models/structure.model';

class SubProgramBaseModel {
  id!: number;
  code!: string;
  exercise!: ExerciseModel;
  labelFr!: string;
  labelEn!: string;
  presentationEn!: string;
  presentationFr!: string;
}

export class SubProgramObjectiveModel {
  id!: number;
  index!: number;
  labelEn!: string;
  labelFr!: string;
  indicators!: SubProgramObjectiveIndicatorModel[];
}

export class SubProgramObjectiveIndicatorModel {
  index!: number;
  parentIndex!: number;
  labelEn!: string;
  labelFr!: string;
  measurementUnit!: string;
  referenceValue!: number;
  referenceYear!: number;
  targetValue!: number;
  targetYear!: number;
  verificationSourceEn!: string;
  verificationSourceFr!: string;
  owner!: UserModel;
}

export class SubProgramModel extends SubProgramBaseModel {
  engagementAuthorization!: number;
  indicatorsPaymentCreditN1!: number;
  indicatorsPaymentCreditN2!: number;
  indicatorsPaymentCreditN3!: number;
  objectives!: SubProgramObjectiveModel[];
  actions!: SubProgramActionModel[];
  structure!: StructureModel;
  strategies!: {
    strategyFr: string;
    strategyEn: string;
  };
  coordinator!: string;
  owner!: string;
  followUpOwner!: string;
  startDate!: string;
  endDate!: string;

  constructor(params?: Partial<SubProgramModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }

  public get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }

  public get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }
}

export class SubProgramActionModel extends SubProgramBaseModel {
  objectivesFr!: string;
  objectivesEn!: string;
  indicatorsFr!: string;
  indicatorsEn!: string;
  verificationSourceFr!: string;
  verificationSourceEn!: string;
  referenceValue!: number;
  referenceYear!: Date;
  targetValue!: number;
  targetYear!: Date;
  measurementUnit!: string;
  startDate!: Date;
  endDate!: Date;
  subProgram?: SubProgramModel;
  activities?: SubProgramActivityModel[];

  constructor(params?: Partial<SubProgramActionModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }

  public get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }

  public get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }
}

export class SubProgramActivityModel extends SubProgramBaseModel {
  objectivesFr!: string;
  objectivesEn!: string;
  resultsFr!: string;
  resultsEn!: string;
  indicatorsFr!: string;
  indicatorsEn!: string;
  verificationSourceFr!: string;
  verificationSourceEn!: string;
  referenceValue!: number;
  referenceYear!: Date;
  targetValue!: number;
  targetYear!: Date;
  measurementUnit!: string;
  startDate!: Date;
  endDate!: Date;
  action?: SubProgramActionModel;
  tasks?: SubProgramActivityTaskModel[];

  constructor(params?: Partial<SubProgramActivityModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }

  public get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }

  public get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }
}

export class SubProgramActivityTaskModel extends SubProgramActivityModel {
  isMultiYear!: boolean;
  engagementAuthorization?: number;
  financialSource!: FinancialSourceModel;
  administrativeUnit!: AdministrativeUnitModel;
  operations!: SubProgramActivityTaskOperationModel[];
}

export class SubProgramActivityTaskOperationModel {
  labelFr!: string;
  labelEn!: string;
  deliverablesFr!: string;
  deliverablesEn!: string;
  imputation!: string;
  verificationSourceFr!: string;
  verificationSourceEn!: string;
  engagementAuthorization!: number;
  paymentCreditN1!: number;
  paymentCreditN2!: number;
  paymentCreditN3!: number;
  managementMode!: string;
  managerName!: string;
  locality!: string;
  chronogram!: { label: string; value: number }[];
  physicalUnits!: {
    id: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  paragraph!: ParagraphModel;
  region!: RegionsModel;
  department!: DepartmentModel;
  arrondissementId!: ArrondissementModel;

  constructor(params?: Partial<SubProgramActivityTaskOperationModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
