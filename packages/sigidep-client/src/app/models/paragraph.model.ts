import { FinancialSourceModel } from '@models/financial-source.model';

export class ParagraphModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  abbreviationFr!: string;
  abbreviationEn!: string;
  nature!: FinancialSourceModel;

  constructor(params?: Partial<ParagraphModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }

  get formattedLabelFr(): string {
    return `${this.code} - ${this.labelFr}`;
  }

  get formattedLabelEn(): string {
    return `${this.code} - ${this.labelEn}`;
  }
}
