import { createAction, props } from '@ngrx/store';
import { AdministrativeUnitModel, FunctionModel } from '@models/index';

export const GetAdministrativeUnites = createAction(
  '[AdministrativeUnites] Filter'
);
export const GetAdministrativeUnitesSuccess = createAction(
  '[AdministrativeUnites] Filter success',
  props<{ payload: AdministrativeUnitModel[] }>()
);
export const GetAdministrativeUnitesFailure = createAction(
  '[AdministrativeUnites] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateAdministrativeUnit = createAction(
  '[AdministrativeUnites] Update',
  props<{ id: number }>()
);
export const UpdateAdministrativeUnitSuccess = createAction(
  '[AdministrativeUnites] Update success'
);
export const UpdateAdministrativeUnitFailure = createAction(
  '[AdministrativeUnites] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteAdministrativeUnit = createAction(
  '[AdministrativeUnites] Delete',
  props<{ id: number }>()
);
export const DeleteAdministrativeUnitSuccess = createAction(
  '[AdministrativeUnites] Delete success'
);
export const DeleteAdministrativeUnitFailure = createAction(
  '[AdministrativeUnites] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const GetFunctions = createAction(
  '[Functions] Filter',
  props<{ _type: 'primary' | 'secondary' }>()
);
export const GetFunctionsSuccess = createAction(
  '[Functions] Filter success',
  props<{ payload: FunctionModel[] }>()
);
export const GetFunctionsFailure = createAction(
  '[Functions] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
