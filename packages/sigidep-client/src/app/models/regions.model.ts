export class RegionsModel {
  id!: number;
  code!: string;
  label!: string;

  constructor(param: Partial<RegionsModel>) {
    Object.assign(this, param);
  }

  get formattedLabel(): string {
    return `${this.code} - ${this.label}`;
  }
}
