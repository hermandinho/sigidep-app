import { createAction, props } from '@ngrx/store';
import { ContribuableBugetaireModel } from '@models/contribuable-budgetaire.model';

export const GetContribuablesBugetaires = createAction(
  '[ContribuablesBugetaires] Filter'
);
export const GetContribuablesBugetairesSuccess = createAction(
  '[ContribuablesBugetaires] Filter success',
  props<{ payload: ContribuableBugetaireModel[] }>()
);
export const GetContribuablesBugetairesFailure = createAction(
  '[ContribuablesBugetaires] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateContribuableBugetaire = createAction(
  '[ContribuablesBugetaires] Update',
  props<{ payload: ContribuableBugetaireModel }>()
);
export const UpdateContribuableBugetaireSuccess = createAction(
  '[ContribuablesBugetaires] Update success',
  props<{ payload: ContribuableBugetaireModel }>()
);
export const UpdateContribuableBugetaireFailure = createAction(
  '[ContribuablesBugetaires] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteContribuableBugetaire = createAction(
  '[ContribuablesBugetaires] Delete',
  props<{ id: number }>()
);
export const DeleteContribuableBugetaireSuccess = createAction(
  '[ContribuablesBugetaires] Delete success'
);
export const DeleteContribuableBugetaireFailure = createAction(
  '[ContribuablesBugetaires] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateContribuableBugetaire = createAction(
  '[ContribuablesBugetaires] Create contribuable',
  props<{ payload: ContribuableBugetaireModel }>()
);
export const CreateContribuableBugetaireSuccess = createAction(
  '[ContribuablesBugetaires] Create contribuable',
  props<{ payload: ContribuableBugetaireModel }>()
);
export const CreateContribuableBugetaireFailure = createAction(
  '[ContribuablesBugetaires] Create contribuable',
  props<{ error?: any }>()
);
