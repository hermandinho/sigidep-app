import { BaseModel } from './base.model';
export type StepVirement =
    | 'virement'
    | 'details-virement'
    | 'validate';

export class VirementModele extends BaseModel {
    numero!: string;
    object_virement!: string;
    date_virement!: string;
    date_signature_virement!: string;
    signataire_virement!: string;
    type_virement!: string;
    sp_source_virement!: string;
    sp_cible_virement!: string;
    etat_virement!: string;

    constructor(params?: Partial<VirementModele>) {
        super();
        if (params) {
            Object.assign(this, params);
        }
    }
}
