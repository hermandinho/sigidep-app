import { EngagementMandatModel } from '@models/engagement-mandat.model';
import { createAction, props } from '@ngrx/store';
export const GetEngagementMandats = createAction(
  '[EngagementMandats] Filter'
);
export const GetEngagementMandatsSuccess = createAction(
  '[EngagementMandats] Filter success',
  props<{ payload: EngagementMandatModel[] }>()
);
export const GetEngagementMandatsFailure = createAction(
  '[EngagementMandats] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateEngagementMandats = createAction(
  '[EngagementMandats] Create engagement',
  props<{ payload: EngagementMandatModel }>()
);
export const CreateEngagementMandatsSuccess = createAction(
  '[EngagementMandats] Create engagement',
  props<{ payload: EngagementMandatModel }>()
);
export const CreateEngagementMandatsFailure = createAction(
  '[EngagementMandats] Create engagement',
  props<{ error?: any }>()
);

export const DeleteEngagementMandats = createAction(
  '[EngagementMandats] Delete',
  props<{ id: number }>()
);
export const DeleteEngagementMandatsSuccess = createAction(
  '[EngagementMandats] Delete success'
);
export const DeleteEngagementMandatsFailure = createAction(
  '[EngagementMandats] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateEngagementMandats = createAction(
  '[EngagementMandats] Update',
  props<{ payload: EngagementMandatModel }>()
);
export const UpdateEngagementMandatsSuccess = createAction(
  '[EngagementMandats] Update success',
  props<{ payload: EngagementMandatModel }>()
);
export const UpdateEngagementMandatsFailure = createAction(
  '[EngagementMandats] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CancelEngagementMandatsReservation = createAction(
  '[EngagementMandats] Cancel',
  props<{ payload: EngagementMandatModel }>()
);
export const CancelEngagementMandatsReservationSuccess = createAction(
  '[EngagementMandats] Cancel success',
  props<{ payload: EngagementMandatModel }>()
);
export const CancelEngagementMandatsReservationFailure = createAction(
  '[EngagementMandats] Cancel failure',
  props<{ error?: any }>() // TODO defile errors global model here
);


