import { BaseModel } from './base.model';

export class Virement extends BaseModel {
    nomModel?: string;
    enteteModel?: string;
    chapeauModel?: string;
    contenuModel!: string;

    constructor(params?: Partial<Virement>) {
        super();
        if (params) {
            Object.assign(this, params);
        }
    }
}
