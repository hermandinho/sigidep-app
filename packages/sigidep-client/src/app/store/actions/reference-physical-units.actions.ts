import { createAction, props } from '@ngrx/store';
import { ReferencePhysicalUnitModel } from '@models/index';

export const GetReferencePhysicalUnits = createAction(
  '[ReferencePhysicalUnits] Filter'
);
export const GetReferencePhysicalUnitsSuccess = createAction(
  '[ReferencePhysicalUnits] Filter success',
  props<{ payload: ReferencePhysicalUnitModel[] }>()
);
export const GetReferencePhysicalUnitsFailure = createAction(
  '[ReferencePhysicalUnits] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateReferencePhysicalUnit = createAction(
  '[ReferencePhysicalUnits] Update',
  props<{ id: number }>()
);
export const UpdateReferencePhysicalUnitSuccess = createAction(
  '[ReferencePhysicalUnits] Update success'
);
export const UpdateReferencePhysicalUnitFailure = createAction(
  '[ReferencePhysicalUnits] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteReferencePhysicalUnit = createAction(
  '[ReferencePhysicalUnits] Delete',
  props<{ id: number }>()
);
export const DeleteReferencePhysicalUnitSuccess = createAction(
  '[ReferencePhysicalUnits] Delete success'
);
export const DeleteReferencePhysicalUnitFailure = createAction(
  '[ReferencePhysicalUnits] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
