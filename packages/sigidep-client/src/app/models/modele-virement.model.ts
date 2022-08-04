import { BaseModel } from './base.model';

export class ModeleVirementModel extends BaseModel {
    nomModel?: string;
    enteteModel?: string;
    chapeauModel?: string;
    contenuModel!: string;

    constructor(params?: Partial<ModeleVirementModel>) {
        super();
        if (params) {
            Object.assign(this, params);
        }
    }
}
