export class RegionsModel {
  id!: number;
  code!: string;
  labelEn!: string;
  labelFr!: string;

  constructor(param: Partial<RegionsModel>) {
    Object.assign(this, param);
  }

  get formattedLabel(): string {
    return `${this.code} - ${this.labelFr}(${this.labelEn})`;
  }
}
