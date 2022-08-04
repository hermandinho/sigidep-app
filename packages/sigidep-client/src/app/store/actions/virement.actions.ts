import { Virement } from '@models/virement';
import { createAction, props } from '@ngrx/store';

export const GetVirement = createAction('[Virement] Filter');
export const VirementsSuccess = createAction(
    '[Virements] Filter success',
    props<{ payload: Virement[] }>()
);
export const VirementsFailure = createAction(
    '[Virements] Filter failure',
    props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateVirement = createAction(
    '[Virements] Update',
    props<{ id: number }>()
);
export const UpdateVirementSuccess = createAction(
    '[Virements] Update success'
);
export const UpdateVirementFailure = createAction(
    '[Virements] Update failure',
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
