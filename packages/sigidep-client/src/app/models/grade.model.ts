export class GradeModel {
  id?: number;
  code!: string;
  description?: string;

  constructor(params?: Partial<GradeModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
