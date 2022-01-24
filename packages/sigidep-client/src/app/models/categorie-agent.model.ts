import { BaseModel } from './base.model';

export class CategorieAgentModel extends BaseModel {
  code!: string;
  description?: string;

  constructor(params?: Partial<CategorieAgentModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
