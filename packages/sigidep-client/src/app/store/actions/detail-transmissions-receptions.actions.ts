import { createAction, props } from '@ngrx/store';

export const GetTransmissionsReceptionsDetails = createAction(
  '[transmissionsReceptionsDetails] Filter',
  props<{ ids?: number[]; exercices?: string[]; etats?: string[]; objets?: string[]}>());
export const GetTransmissionsReceptionsDetailsSuccess = createAction(
  '[transmissionsReceptionsDetails] Filter success',
  props<{ payload: any[] }>()
);
export const GetTransmissionsReceptionsDetailsFailure = createAction(
  '[transmissionsReceptionsDetails] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
