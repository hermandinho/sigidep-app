import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { createAction, props } from '@ngrx/store';
export const GetEngagementDecisions = createAction(
  '[EngagementDecisions] Filter'
);
export const GetEngagementDecisionsSuccess = createAction(
  '[EngagementDecisions] Filter success',
  props<{ payload: EngagementDecisionModel[] }>()
);
export const GetEngagementDecisionsFailure = createAction(
  '[EngagementDecisions] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateEngagementDecision = createAction(
  '[EngagementDecisions] Create engagement',
  props<{ payload: EngagementDecisionModel }>()
);
export const CreateEngagementDecisionsuccess = createAction(
  '[EngagementDecisions] Create engagement',
  props<{ payload: EngagementDecisionModel }>()
);
export const CreateEngagementDecisionFailure = createAction(
  '[EngagementDecisions] Create engagement',
  props<{ error?: any }>()
);

export const DeleteEngagementDecision = createAction(
  '[EngagementDecisions] Delete',
  props<{ id: number }>()
);
export const DeleteEngagementDecisionSuccess = createAction(
  '[EngagementDecisions] Delete success'
);
export const DeleteEngagementDecisionFailure = createAction(
  '[EngagementDecisions] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateEngagementDecision = createAction(
  '[EngagementDecisions] Update',
  props<{ payload: EngagementDecisionModel }>()
);
export const UpdateEngagementDecisionSuccess = createAction(
  '[EngagementDecisions] Update success',
  props<{ payload: EngagementDecisionModel }>()
);
export const UpdateEngagementDecisionFailure = createAction(
  '[EngagementDecisions] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
