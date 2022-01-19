import { createAction, props } from '@ngrx/store';
import { RegimeFiscalModel } from '@models/regime-fiscal.model';
export const GetRegimes = createAction('[Regimes] Filter');
export const GetRegimesSuccess = createAction(
  '[Regimes] Filter success',
  props<{ payload: RegimeFiscalModel[] }>()
);
export const GetRegimesFailure = createAction(
  '[Regimes] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateRegimeFiscal = createAction(
  '[Regimes] Create regime fiscal',
  props<{ payload: RegimeFiscalModel }>()
);
export const CreateRegimeFiscalSuccess = createAction(
  '[Regimes] Create regime fiscal',
  props<{ payload: RegimeFiscalModel }>()
);
export const CreateRegimeFiscalFailure = createAction(
  '[Regimes] Create regime fiscal',
  props<{ error?: any }>()
);
