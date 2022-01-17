import { createAction, props } from '@ngrx/store';
import { ContribuableModel } from '@models/contribuable.model';

export const GetContribuables = createAction('[Contribuables] Filter');
export const GetContribuablesSuccess = createAction(
  '[Contribuables] Filter success',
  props<{ payload: ContribuableModel[] }>()
);
export const GetContribuablesFailure = createAction(
  '[Contribuables] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateContribuable = createAction(
  '[Contribuables] Update',
  props<{ payload: ContribuableModel }>()
);
export const UpdateContribuableSuccess = createAction(
  '[Contribuables] Update success',
  props<{ payload: ContribuableModel }>()
);
export const UpdateContribuableFailure = createAction(
  '[Contribuables] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteContribuable = createAction(
  '[Contribuables] Delete',
  props<{ id: number }>()
);
export const DeleteContribuableSuccess = createAction(
  '[Contribuables] Delete success'
);
export const DeleteContribuableFailure = createAction(
  '[Contribuables] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateContribuable = createAction(
  '[Contribuables] Create contribuable',
  props<{ payload: ContribuableModel }>()
);
export const CreateContribuableSuccess = createAction(
  '[Contribuables] Create contribuable',
  props<{ payload: ContribuableModel }>()
);
export const CreateContribuableFailure = createAction(
  '[Contribuables] Create contribuable',
  props<{ error?: any }>()
);
