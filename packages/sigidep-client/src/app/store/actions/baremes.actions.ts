import { BaremeMissionModel } from '@models/bareme-mission.model';
import { createAction, props } from '@ngrx/store';
export const GetBaremes = createAction('[baremes] Filter');
export const GetBaremesSuccess = createAction(
  '[baremes] Filter success',
  props<{ payload: BaremeMissionModel[] }>()
);
export const GetBaremesFailure = createAction(
  '[baremes] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateBareme = createAction(
  '[baremes] Create bareme',
  props<{ payload: BaremeMissionModel }>()
);
export const CreateBaremeSuccess = createAction(
  '[baremes] Create bareme',
  props<{ payload: BaremeMissionModel }>()
);
export const CreateBaremeFailure = createAction(
  '[baremes] Create bareme',
  props<{ error?: any }>()
);

export const UpdateBareme = createAction(
  '[baremes] Update',
  props<{ payload: BaremeMissionModel }>()
);
export const UpdateBaremeSuccess = createAction(
  '[baremes] Update success',
  props<{ payload: BaremeMissionModel }>()
);
export const UpdateBaremeFailure = createAction(
  '[baremes] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteBareme = createAction(
  '[baremes] Delete',
  props<{ id: number }>()
);
export const DeleteBaremeSuccess = createAction('[baremes] Delete success');
export const DeleteBaremeFailure = createAction(
  '[baremes] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
