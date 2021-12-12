export class FinancialSourceModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  abbreviationFr!: string;
  abbreviationEn!: string;
  acceptsDeliverables!: boolean;

  constructor(param?: Partial<FinancialSourceModel>) {
    if (param) {
      Object.assign(this, param);
    }
  }

  get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }

  get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }
}
