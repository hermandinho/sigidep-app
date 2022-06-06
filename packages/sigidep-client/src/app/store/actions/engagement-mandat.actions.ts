import { EngagementMandatModel } from '@models/engagement-mandat.model';
import { createAction, props } from '@ngrx/store';
export const GetEngagementMandats = createAction(
  '[Mandats] Filter',
  props<{ procedures?: string[]; etats?: string[]; numeros?: string }>()
);
export const GetEngagementMandatsSuccess = createAction(
  '[Mandats] Filter success',
  props<{ payload: EngagementMandatModel[] }>()
);
export const GetEngagementMandatsFailure = createAction(
  '[Mandats] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateEngagementMandats = createAction(
  '[Mandats] Create engagement',
  props<{ payload: EngagementMandatModel }>()
);
export const CreateEngagementMandatsSuccess = createAction(
  '[Mandats] Create engagement',
  props<{ payload: EngagementMandatModel }>()
);
export const CreateEngagementMandatsFailure = createAction(
  '[Mandats] Create engagement',
  props<{ error?: any }>()
);

export const DeleteEngagementMandats = createAction(
  '[Mandats] Delete',
  props<{ id: number }>()
);
export const DeleteEngagementMandatsSuccess = createAction(
  '[Mandats] Delete success'
);
export const DeleteEngagementMandatsFailure = createAction(
  '[Mandats] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateEngagementMandats = createAction(
  '[Mandats] Update',
  props<{ payload: EngagementMandatModel }>()
);
export const UpdateEngagementMandatsSuccess = createAction(
  '[Mandats] Update success',
  props<{ payload: EngagementMandatModel }>()
);
export const UpdateEngagementMandatsFailure = createAction(
  '[Mandats] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CancelEngagementMandatsReservation = createAction(
  '[Mandats] Cancel',
  props<{
    payload: any;
  }>()
);
export const CancelEngagementMandatsReservationSuccess = createAction(
  '[Mandats] Cancel success',
  props<{ payload: EngagementMandatModel }>()
);
export const CancelEngagementMandatsReservationFailure = createAction(
  '[Mandats] Cancel failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
