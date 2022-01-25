import { CarnetMandatModel } from '@models/carnet-mandat.model';
import { createAction, props } from '@ngrx/store';

export const GetCarnetMandats = createAction('[carnetsMandats] Filter');
export const GetCarnetMandatsSuccess = createAction(
  '[carnetsMandats] Filter success',
  props<{ payload: CarnetMandatModel[] }>()
);
export const GetCarnetMandatsFailure = createAction(
  '[carnetsMandats] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateCarnetMandat = createAction(
  '[carnetsMandats] Update',
  props<{ payload: CarnetMandatModel }>()
);
export const UpdateCarnetMandatSuccess = createAction(
  '[carnetsMandats] Update success',
  props<{ payload: CarnetMandatModel }>()
);
export const UpdateCarnetMandatFailure = createAction(
  '[carnetsMandats] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteCarnetMandat = createAction(
  '[carnetsMandats] Delete',
  props<{ id: number }>()
);
export const DeleteCarnetMandatSuccess = createAction(
  '[carnetsMandats] Delete success'
);
export const DeleteCarnetMandatFailure = createAction(
  '[carnetsMandats] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateCarnetMandat = createAction(
  '[carnetsMandats] Create Carnet Mandat',
  props<{ payload: CarnetMandatModel }>()
);
export const CreateCarnetMandatSuccess = createAction(
  '[carnetsMandats] Create Success',
  props<{ payload: CarnetMandatModel }>()
);
export const CreateCarnetMandatFailure = createAction(
  '[carnetsMandats] Create Failure',
  props<{ error?: any }>()
);
