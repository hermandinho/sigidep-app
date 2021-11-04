import { FinancialSourceModel } from '@models/financial-source.model';

export class ParagraphModel {
  id!: number;
  code!: string;
  labelFr!: string;
  labelEn!: string;
  abbreviationFr!: string;
  abbreviationEn!: string;
  nature!: FinancialSourceModel;
}
