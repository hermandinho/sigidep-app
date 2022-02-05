import { EncoursModel } from '@models/encours.model';
import { createAction, props } from '@ngrx/store';
export const GetEncours = createAction('[Encours] Filter');
export const GetEncoursSuccess = createAction(
  '[Encours] Filter success',
  props<{ payload: EncoursModel[] }>()
);
export const GetEncoursFailure = createAction(
  '[Encours] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateEncours = createAction(
  '[Encours] Create encours',
  props<{ payload: EncoursModel }>()
);
export const CreateEncoursSuccess = createAction(
  '[Encours] Create encours',
  props<{ payload: EncoursModel }>()
);
export const CreateEncoursFailure = createAction(
  '[Encours] Create encours',
  props<{ error?: any }>()
);

export const DeleteEncours = createAction(
  '[Encours] Delete',
  props<{ id: number }>()
);
export const DeleteEncoursSuccess = createAction('[Encours] Delete success');
export const DeleteEncoursFailure = createAction(
  '[Encours] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
