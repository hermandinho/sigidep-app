export class CreateEncoursModel {
  id!: number;
  exercise!: number;
  valeurSeuil!: number;

  constructor(params?: Partial<CreateEncoursModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
