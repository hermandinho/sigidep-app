export class RegionsModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  departments!: DepartmentModel[];

  constructor(param: Partial<RegionsModel>) {
    Object.assign(this, param);
  }

  get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }

  get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }
}

export class DepartmentModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  arrondissements!: ArrondissementModel[];

  constructor(param: Partial<DepartmentModel>) {
    Object.assign(this, param);
  }

  get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }

  get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }
}

export class ArrondissementModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  chiefTown!: string;
  department!: DepartmentModel;

  constructor(param: Partial<ArrondissementModel>) {
    Object.assign(this, param);
  }

  get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }

  get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }
}
