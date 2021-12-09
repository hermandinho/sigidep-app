import { ParagraphModel } from '@models/paragraph.model';

export class ReferencePhysicalUnitModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  paragraph!: ParagraphModel;

  constructor(params?: Partial<ReferencePhysicalUnitModel>) {
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
