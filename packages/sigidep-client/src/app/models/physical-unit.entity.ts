import {
  ReferencePhysicalUnitModel,
  SubProgramActivityTaskOperationModel,
  UserModel,
} from '.';

export class PhysicalUnitModel {
  id?: number;
  quantity!: number;
  unitPrice!: number;
  totalPrice!: number;

  createdBy!: UserModel;

  referencePhysicalUnit!: Partial<ReferencePhysicalUnitModel>;

  operation!: SubProgramActivityTaskOperationModel;

  constructor(params?: Partial<PhysicalUnitModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
