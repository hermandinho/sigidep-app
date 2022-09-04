import { EtatVirementEnum } from '@pages/virements/tools/virement-tools';
import { BaseModel } from './base.model';
import { DetailsVirementModel } from './detailsVirement';
import { ExerciseModel } from './exercise.model';
import { ModeleVirementModel } from './modele-virement.model';
export type StepVirement =
    | 'virement'
    | 'details-virement'
    | 'validation-virement';

export class VirementModele extends BaseModel {
    numero?: string;
    objectVirement!: string;
    dateVirement!: string;
    dateSignatureVirement?: string;
    signataireVirement?: string;
    typeVirement!: string;
    spSourceVirement!: string;
    spCibleVirement!: string;
    etatVirement?: EtatVirementEnum;
    detailsVirementsDebit!: DetailsVirementModel[];
    detailsVirementsCredit!: DetailsVirementModel[];
    detailsVirements!: DetailsVirementModel[];
    modelVirement!: ModeleVirementModel;
    exercice!: ExerciseModel;

    constructor(params?: Partial<VirementModele>) {
        super();
        if (params) {
            Object.assign(this, params);
        }
    }
}
