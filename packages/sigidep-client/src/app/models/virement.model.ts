import { BaseModel } from './base.model';
import { DetailsVirementModel } from './detailsVirement';
import { ExerciseModel } from './exercise.model';
import { ModeleVirementModel } from './modele-virement.model';
export type StepVirement =
    | 'virement'
    | 'details-virement'
    | 'validate';

export class VirementModele extends BaseModel {
    numero?: string;
    objectVirement!: string;
    dateVirement!: string;
    dateSignatureVirement?: string;
    signataireVirement?: string;
    typeVirement!: string;
    spSourceVirement!: string;
    spCibleVirement!: string;
    etatVirement?: string;
    detailsVirementsDebit!: DetailsVirementModel[];
    detailsVirementsCredit!: DetailsVirementModel[];
    modelVirement!: ModeleVirementModel;
    exercice!: ExerciseModel;

    constructor(params?: Partial<VirementModele>) {
        super();
        if (params) {
            Object.assign(this, params);
        }
    }
}
