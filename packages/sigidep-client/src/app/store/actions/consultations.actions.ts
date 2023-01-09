import { EncoursModel } from '@models/encours.model';
import { createAction, props } from '@ngrx/store';
export const GetImputations = createAction(
  '[Encours] Filter',
  props<{ imputation: string }>()
);
export const GetImputationsSuccess = createAction(
  '[Encours] Filter success',
  props<{ payload: EncoursModel[] }>()
);
export const GetImputationsFailure = createAction(
  '[Encours] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

