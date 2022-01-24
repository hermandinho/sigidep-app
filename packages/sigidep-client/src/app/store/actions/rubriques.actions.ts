import { createAction, props } from '@ngrx/store';
import { RubriqueModel } from '@models/rubrique.model';

export const GetRubriques = createAction('[rubriques] Filter');
export const GetRubriquesSuccess = createAction(
  '[rubriques] Filter success',
  props<{ payload: RubriqueModel[] }>()
);
export const GetRubriquesFailure = createAction(
  '[rubriques] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
//mercuriales / rubriques;
export const UpdateRubrique = createAction(
  '[rubriques] Update',
  props<{ payload: RubriqueModel }>()
);
export const UpdateRubriquesuccess = createAction(
  '[rubriques] Update success',
  props<{ payload: RubriqueModel }>()
);
export const UpdateRubriqueFailure = createAction(
  '[rubriques] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteRubrique = createAction(
  '[rubriques] Delete',
  props<{ id: number }>()
);
export const DeleteRubriquesuccess = createAction('[rubriques] Delete success');
export const DeleteRubriqueFailure = createAction(
  '[rubriques] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateRubrique = createAction(
  '[rubriques] Create rubrique',
  props<{ payload: RubriqueModel }>()
);
export const CreateRubriqueSuccess = createAction(
  '[rubriques] Create rubrique',
  props<{ payload: RubriqueModel }>()
);
export const CreateRubriqueFailure = createAction(
  '[rubriques] Create rubrique',
  props<{ error?: any }>()
);
