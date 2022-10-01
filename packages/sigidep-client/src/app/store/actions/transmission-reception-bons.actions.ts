import { BonEngagementModel } from '@models/bon-engagement.model';
import { createAction, props } from '@ngrx/store';

export const GetTransmissionsReceptionsBons = createAction('[TransBons] Filter',props<{ exercices?: string[];etats?: string[];}>());
export const GetTransmissionsReceptionsBonsSuccess = createAction(
  '[TransBons] Filter success',
  props<{ payload: BonEngagementModel[] }>()
);
export const GetTransmissionsReceptionsBonsFailure = createAction(
  '[TransBons] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
