export class RegimeFiscalModel {
  code!: string;
  description!: string;

  constructor(params?: Partial<RegimeFiscalModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}

export type RegimeFiscalType = 'REEL' | 'SIMPLIFIE';
