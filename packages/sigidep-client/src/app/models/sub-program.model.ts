import { UserModel } from '@models/user.model';

class SubProgramBaseModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  presentationEn!: string;
  presentationFr!: string;
}

export class SubProgramObjectiveModel {
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
  activities!: SubProgramActivityModel[];

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
}
