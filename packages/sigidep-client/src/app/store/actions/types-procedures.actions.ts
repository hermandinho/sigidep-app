import { TypeProcedureModel } from '@models/type-procedure.model';
import { createAction, props } from '@ngrx/store';
export const GetTypesProcedures = createAction('[TypesProcedures] Filter');
export const GetTypesProceduresSuccess = createAction(
  '[TypesProcedures] Filter success',
  props<{ payload: TypeProcedureModel[] }>()
);
export const GetTypesProceduresFailure = createAction(
  '[TypesProcedures] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateTypeProcedure = createAction(
  '[TypesProcedures] Create type-procedure',
  props<{ payload: TypeProcedureModel }>()
);
export const CreateTypeProcedureSuccess = createAction(
  '[TypesProcedures] Create type-procedure',
  props<{ payload: TypeProcedureModel }>()
);
export const CreateTypeProcedureFailure = createAction(
  '[TypesProcedures] Create type-procedure',
  props<{ error?: any }>()
);

export const UpdateTypeProcedure = createAction(
  '[TypesProcedures] Update',
  props<{ payload: TypeProcedureModel }>()
);
export const UpdateTypeProcedureSuccess = createAction(
  '[TypesProcedures] Update success',
  props<{ payload: TypeProcedureModel }>()
);
export const UpdateTypeProcedureFailure = createAction(
  '[TypesProcedures] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteTypeProcedure = createAction(
  '[TypesProcedures] Delete',
  props<{ id: number }>()
);
export const DeleteTypeProcedureSuccess = createAction(
  '[TypesProcedures] Delete success'
);
export const DeleteTypeProcedureFailure = createAction(
  '[TypesProcedures] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
