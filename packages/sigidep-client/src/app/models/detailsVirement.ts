import { BaseModel } from './base.model';
import { EncoursModel } from './encours.model';
import { SubProgramActivityTaskOperationModel } from './sub-program.model';

export class DetailsVirementModel extends BaseModel {
    codeInput!: string;
    libelleInput!: string;
    isCredit: boolean = true;
    montant?: number;
    encour!: EncoursModel;

    constructor(params?: Partial<DetailsVirementModel>) {
        super();
        if (params) {
            Object.assign(this, params);
        }
    }
}
