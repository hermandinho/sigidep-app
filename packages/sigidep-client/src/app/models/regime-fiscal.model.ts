export class RegimeFiscalModel {
  id?: number;
  code!: string;
  description!: string;

  constructor(params?: Partial<RegimeFiscalModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
