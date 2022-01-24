import { SousRubriqueModel } from '@models/sous-rubrique.model';
import { createAction, props } from '@ngrx/store';

export const GetSousRubriques = createAction('[sousRubriques] Filter');
export const GetSousRubriquesSuccess = createAction(
  '[sousRubriques] Filter success',
  props<{ payload: SousRubriqueModel[] }>()
);
export const GetSousRubriquesFailure = createAction(
  '[sousRubriques] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
//mercuriales / sousRubriques;
export const UpdateSousRubrique = createAction(
  '[sousRubriques] Update',
  props<{ payload: SousRubriqueModel }>()
);
export const UpdateSousRubriqueSuccess = createAction(
  '[sousRubriques] Update success',
  props<{ payload: SousRubriqueModel }>()
);
export const UpdateSousRubriqueFailure = createAction(
  '[sousRubriques] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteSousRubrique = createAction(
  '[sousRubriques] Delete',
  props<{ id: number }>()
);
export const DeleteSousRubriquesuccess = createAction(
  '[sousRubriques] Delete success'
);
export const DeleteSousRubriqueFailure = createAction(
  '[sousRubriques] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateSousRubrique = createAction(
  '[sousRubriques] Create sous-rubrique',
  props<{ payload: SousRubriqueModel }>()
);
export const CreateSousRubriqueSuccess = createAction(
  '[sousRubriques] Create sous-rubrique',
  props<{ payload: SousRubriqueModel }>()
);
export const CreateSousRubriqueFailure = createAction(
  '[sousRubriques] Create sous-rubrique',
  props<{ error?: any }>()
);
