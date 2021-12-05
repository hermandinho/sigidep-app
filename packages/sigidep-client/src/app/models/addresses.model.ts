export class RegionsModel {
  id!: number;
  code!: string;
  label!: string;
  departments!: DepartmentModel[];

  constructor(param: Partial<RegionsModel>) {
    Object.assign(this, param);
  }

  get formattedLabel(): string {
    return `${this.code} - ${this.label}`;
  }
}

export class DepartmentModel {
  id!: number;
  code!: string;
  label!: string;
  arrondissements!: ArrondissementModel[];

  constructor(param: Partial<DepartmentModel>) {
    Object.assign(this, param);
  }

  get formattedLabel(): string {
    return `${this.code} - ${this.label}`;
  }
}

export class ArrondissementModel {
  id!: number;
  code!: string;
  label!: string;
  department!: DepartmentModel;

  constructor(param: Partial<ArrondissementModel>) {
    Object.assign(this, param);
  }

  get formattedLabel(): string {
    return `${this.code} - ${this.label}`;
  }
}
