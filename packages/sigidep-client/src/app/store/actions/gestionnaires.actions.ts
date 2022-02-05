import { GestionnaireModel } from './../../models/gestionnaire.model';
import { createAction, props } from '@ngrx/store';

export const GetGestionnaires = createAction('[Gestionnaires] Filter');
export const GetGestionnairesSuccess = createAction(
  '[Gestionnaires] Filter success',
  props<{ payload: GestionnaireModel[] }>()
);
export const GetGestionnairesFailure = createAction(
  '[Gestionnaires] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateGestionnaire = createAction(
  '[Gestionnaires] Update',
  props<{ payload: GestionnaireModel }>()
);
export const UpdateGestionnaireSuccess = createAction(
  '[Gestionnaires] Update success',
  props<{ payload: GestionnaireModel }>()
);
export const UpdateGestionnaireFailure = createAction(
  '[Gestionnaires] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteGestionnaire = createAction(
  '[Gestionnaires] Delete',
  props<{ id: number }>()
);
export const DeleteGestionnaireSuccess = createAction(
  '[Gestionnaires] Delete success'
);
export const DeleteGestionnaireFailure = createAction(
  '[Gestionnaires] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateGestionnaire = createAction(
  '[Gestionnaires] Create contribuable',
  props<{ payload: GestionnaireModel }>()
);
export const CreateGestionnaireSuccess = createAction(
  '[Gestionnaires] Create contribuable',
  props<{ payload: GestionnaireModel }>()
);
export const CreateGestionnaireFailure = createAction(
  '[Gestionnaires] Create contribuable',
  props<{ error?: any }>()
);
