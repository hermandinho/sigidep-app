import { BaseModel } from './base.model';

export class GradeModel extends BaseModel {
  code!: string;
  description?: string;

  constructor(params?: Partial<GradeModel>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
