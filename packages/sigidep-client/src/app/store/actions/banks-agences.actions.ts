import { createAction, props } from '@ngrx/store';
import { BankModel } from '@models/index';

export const GetBanks = createAction('[Banks] Filter');
export const GetBanksSuccess = createAction(
  '[Banks] Filter success',
  props<{ payload: BankModel[] }>()
);
export const GetBanksFailure = createAction(
  '[Banks] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteBanks = createAction(
  '[Banks] Delete',
  props<{ ids: number[] }>()
);
export const DeleteBanksSuccess = createAction(
  '[Banks] Delete success',
  props<{ ids: number[] }>()
);
export const DeleteBanksFailure = createAction(
  '[Banks] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteAgenges = createAction(
  '[Agenges] Delete',
  props<{ ids: number[] }>()
);
export const DeleteAgengesSuccess = createAction(
  '[Agenges] Delete success',
  props<{ ids: number[] }>()
);
export const DeleteAgengesFailure = createAction(
  '[Agenges] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
