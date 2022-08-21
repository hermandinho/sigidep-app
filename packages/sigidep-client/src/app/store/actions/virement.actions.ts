import { VirementModele } from '@models/virement.model';
import { createAction, props } from '@ngrx/store';

export const GetVirement = createAction('[Virement] Filter');
export const GetVirementsSuccess = createAction(
    '[Virements] Filter success',
    props<{ payload: VirementModele[] }>()
);
export const GetVirementsFailure = createAction(
    '[Virements] Filter failure',
    props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateVirement = createAction(
    '[Virements] Update',
    props<{ payload: VirementModele }>()
);
export const UpdateVirementSuccess = createAction(
    '[Virements] Update success',
    props<{ payload: VirementModele }>()
);
export const UpdateVirementFailure = createAction(
    '[Virements] Update failure',
    props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteVirement = createAction(
    '[ModelVirements] Delete',
    props<{ id: number }>()
);
export const DeleteVirementSuccess = createAction(
    '[ModelVirements] Delete success'
);
export const DeleteVirementFailure = createAction(
    '[ModelVirements] Delete failure',
    props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateVirement = createAction(
    '[modele virement] Create Modele Virement',
    props<{ payload: VirementModele }>()
);
export const CreateVirementSuccess = createAction(
    '[modele virement] Create Modele Virement successfully',
    props<{ payload: VirementModele }>()
);
export const CreateVirementFailure = createAction(
    '[modele virement] Create Modele Virement failure',
    props<{ error?: any }>()
);