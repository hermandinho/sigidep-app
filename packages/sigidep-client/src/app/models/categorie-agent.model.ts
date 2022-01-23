export class CategorieAgentModel {
  id?: number;
  code!: string;
  description?: string;

  constructor(params?: Partial<CategorieAgentModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
