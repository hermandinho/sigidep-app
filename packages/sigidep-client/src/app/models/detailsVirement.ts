import { BaseModel } from './base.model';
import { SubProgramActivityTaskOperationModel } from './sub-program.model';

export class DetailsVirementModel extends BaseModel {
    imputation!: string;
    montant?: number;
    operation!: SubProgramActivityTaskOperationModel;

    constructor(params?: Partial<DetailsVirementModel>) {
        super();
        if (params) {
            Object.assign(this, params);
        }
    }
}
