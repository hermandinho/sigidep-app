import { ExecTaxesModel } from '@models/exec-taxes.model';
import { createAction, props } from '@ngrx/store';
export const GetTaxes = createAction('[ExecTaxes] Filter');
export const GetTaxesSuccess = createAction(
  '[ExecTaxes] Filter success',
  props<{ payload: ExecTaxesModel[] }>()
);
export const GetTaxesFailure = createAction(
  '[ExecTaxes] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const Createtaxe = createAction(
  '[ExecTaxes] Create taxe',
  props<{ payload: ExecTaxesModel }>()
);
export const CreateTaxesuccess = createAction(
  '[ExecTaxes] Create taxe',
  props<{ payload: ExecTaxesModel }>()
);
export const CreateTaxeFailure = createAction(
  '[ExecTaxes] Create taxe',
  props<{ error?: any }>()
);

export const DeleteTaxe = createAction(
  '[ExecTaxes] Delete',
  props<{ id: number }>()
);
export const DeleteTaxeSuccess = createAction('[ExecTaxes] Delete success');
export const DeleteTaxeFailure = createAction(
  '[ExecTaxes] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateTaxe = createAction(
  '[ExecTaxes] Update',
  props<{ payload: ExecTaxesModel }>()
);
export const UpdateTaxeSuccess = createAction(
  '[ExecTaxes] Update success',
  props<{ payload: ExecTaxesModel }>()
);
export const UpdateTaxeFailure = createAction(
  '[ExecTaxes] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
