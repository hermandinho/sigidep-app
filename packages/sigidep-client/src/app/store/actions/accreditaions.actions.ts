import { AccreditationGestionnaireModel } from '@models/accreditation-gestionnaire.model';
import { createAction, props } from '@ngrx/store';
export const GetAccreditations = createAction('[Accreditations] Filter');
export const GetAccreditationsSuccess = createAction(
  '[Accreditations] Filter success',
  props<{ payload: AccreditationGestionnaireModel[] }>()
);
export const GetAccreditationsFailure = createAction(
  '[Accreditations] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateAccreditations = createAction(
  '[Accreditations] Create accreditations',
  props<{ payload: AccreditationGestionnaireModel }>()
);
export const CreateAccreditationsSuccess = createAction(
  '[Accreditations] Create accreditations',
  props<{ payload: AccreditationGestionnaireModel }>()
);
export const CreateAccreditationsFailure = createAction(
  '[Accreditations] Create accreditations',
  props<{ error?: any }>()
);

export const DeleteAccreditations = createAction(
  '[Accreditations] Delete',
  props<{ id: number }>()
);
export const DeleteAccreditationsSuccess = createAction(
  '[Accreditations] Delete success'
);
export const DeleteAccreditationsFailure = createAction(
  '[Accreditations] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const GetAccreditationsByGestionnaire = createAction(
  '[Accreditations] GetOne',
  props<{ id: number }>()
);
export const GetAccreditationsByGestionnaireSuccess = createAction(
  '[Accreditations] GetOne success',
  props<{ payload: AccreditationGestionnaireModel[] }>()
);
export const GetAccreditationsByGestionnaireFailure = createAction(
  '[Accreditations] GetOne failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
