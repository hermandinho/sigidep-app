import { ExecProcedureModel } from '@models/exec-procedure.model';
import { createAction, props } from '@ngrx/store';
export const GetProcedures = createAction('[ExecProcedures] Filter');
export const GetProceduresSuccess = createAction(
  '[ExecProcedures] Filter success',
  props<{ payload: ExecProcedureModel[] }>()
);
export const GetProceduresFailure = createAction(
  '[ExecProcedures] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateProcedure = createAction(
  '[ExecProcedures] Create procedure',
  props<{ payload: ExecProcedureModel }>()
);
export const CreateProcedureSuccess = createAction(
  '[ExecProcedures] Create procedure',
  props<{ payload: ExecProcedureModel }>()
);
export const CreateProcedureFailure = createAction(
  '[ExecProcedures] Create procedure',
  props<{ error?: any }>()
);

export const DeleteProcedure = createAction(
  '[ExecProcedures] Delete',
  props<{ id: number }>()
);
export const DeleteProcedureSuccess = createAction(
  '[ExecProcedures] Delete success'
);
export const DeleteProcedureFailure = createAction(
  '[ExecProcedures] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateProcedure = createAction(
  '[ExecProcedures] Update',
  props<{ payload: ExecProcedureModel }>()
);
export const UpdateProcedureSuccess = createAction(
  '[ExecProcedures] Update success',
  props<{ payload: ExecProcedureModel }>()
);
export const UpdateProcedureFailure = createAction(
  '[ExecProcedures] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
