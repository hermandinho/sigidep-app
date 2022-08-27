import { ModeleVirementModel } from '@models/modele-virement.model';
import { createAction, props } from '@ngrx/store';

export const GetModeleVirement = createAction('[ModeleVirement] Filter');
export const GetModeleVirementsSuccess = createAction(
    '[ModeleVirements] Filter success',
    props<{ payload: ModeleVirementModel[] }>()
);
export const GetModeleVirementsFailure = createAction(
    '[ModeleVirements] Filter failure',
    props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateModeleVirement = createAction(
    '[ModeleVirements] Update',
    props<{ payload: ModeleVirementModel }>()
);
export const UpdateModeleVirementSuccess = createAction(
    '[ModeleVirements] Update success',
    props<{ payload: ModeleVirementModel }>()
);
export const UpdateModeleVirementFailure = createAction(
    '[ModeleVirements] Update failure',
    props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteModelVirement = createAction(
    '[ModelVirements] Delete',
    props<{ id: number }>()
);
export const DeleteModelVirementSuccess = createAction(
    '[ModelVirements] Delete success'
);
export const DeleteModelVirementFailure = createAction(
    '[ModelVirements] Delete failure',
    props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateModelevirement = createAction(
    '[modele virement] Create Modele Virement',
    props<{ payload: ModeleVirementModel }>()
);
export const CreateModeleVirementSuccess = createAction(
    '[modele virement] Create Modele Virement successfully',
    props<{ payload: ModeleVirementModel }>()
);
export const CreateModeleVirementFailure = createAction(
    '[modele virement] Create Modele Virement failure',
    props<{ error?: any }>()
);