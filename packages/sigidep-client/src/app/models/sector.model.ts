export class SectorModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;

  constructor(param: Partial<SectorModel>) {
    Object.assign(this, param);
  }

  get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }

  get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }
}
