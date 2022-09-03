import { TransmissionsReceptionModel } from '@models/transmission-reception.model';
import { createAction, props } from '@ngrx/store';

export const GetTransmissionsReceptions = createAction('[transmissionsReceptions] Filter',props<{ exercices?: string[]; objets?: string[];}>());
export const GetTransmissionsReceptionsSuccess = createAction(
  '[transmissionsReceptions] Filter success',
  props<{ payload: TransmissionsReceptionModel[] }>()
);
export const GetTransmissionsReceptionsFailure = createAction(
  '[transmissionsReceptions] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateTransmissionsReception = createAction(
  '[transmissionsReceptions] Update',
  props<{ payload: TransmissionsReceptionModel }>()
);
export const UpdateTransmissionsReceptionSuccess = createAction(
  '[transmissionsReceptions] Update success',
  props<{ payload: TransmissionsReceptionModel }>()
);
export const UpdateTransmissionsReceptionFailure = createAction(
  '[transmissionsReceptions] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteTransmissionsReception = createAction(
  '[transmissionsReceptions] Delete',
  props<{ id: number }>()
);
export const DeleteTransmissionsReceptionSuccess = createAction(
  '[transmissionsReceptions] Delete success'
);
export const DeleteTransmissionsReceptionFailure = createAction(
  '[transmissionsReceptions] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateTransmissionsReception = createAction(
  '[transmissionsReceptions] Cancel',
  props<{ payload: TransmissionsReceptionModel }>()
);
export const CreateTransmissionsReceptionSuccess = createAction(
  '[transmissionsReceptions] Cancel Success',
  props<{ payload: TransmissionsReceptionModel }>()
);
export const CreateTransmissionsReceptionFailure = createAction(
  '[transmissionsReceptions] Cancel Failure',
  props<{ error?: any }>()
);

