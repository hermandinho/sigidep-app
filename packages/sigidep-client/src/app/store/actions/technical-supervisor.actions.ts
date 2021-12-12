import { createAction, props } from '@ngrx/store';
import { TechnicalSupervisorModel } from '@models/index';

export const GetTechnicalSupervisors = createAction(
  '[TechnicalSupervisors] Filter'
);
export const GetTechnicalSupervisorsSuccess = createAction(
  '[TechnicalSupervisors] Filter success',
  props<{ payload: TechnicalSupervisorModel[] }>()
);
export const GetTechnicalSupervisorsFailure = createAction(
  '[TechnicalSupervisors] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateTechnicalSupervisor = createAction(
  '[TechnicalSupervisors] Update',
  props<{ id: number }>()
);
export const UpdateTechnicalSupervisorSuccess = createAction(
  '[TechnicalSupervisors] Update success'
);
export const UpdateTechnicalSupervisorFailure = createAction(
  '[TechnicalSupervisors] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteTechnicalSupervisor = createAction(
  '[TechnicalSupervisors] Delete',
  props<{ id: number }>()
);
export const DeleteTechnicalSupervisorSuccess = createAction(
  '[TechnicalSupervisors] Delete success'
);
export const DeleteTechnicalSupervisorFailure = createAction(
  '[TechnicalSupervisors] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
