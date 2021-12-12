import { createAction, props } from '@ngrx/store';
import { RegionsModel } from '@models/index';

export const GetRegions = createAction('[Regions] Filter');
export const GetRegionsSuccess = createAction(
  '[Regions] Filter success',
  props<{ payload: RegionsModel[] }>()
);
export const GetRegionsFailure = createAction(
  '[Regions] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
