import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { EngagementMissionModel } from '@models/engagement-mission.model';
import { createAction, props } from '@ngrx/store';
import { CategorieProcedure } from 'app/utils/types';

export const GetEngagementJuridiquesByCategory = createAction(
  '[Engagements] Filter by category',
  props<{
    category?: CategorieProcedure;
    procedures?: string[];
    etats?: string[];
  }>()
);
export const GetEngagementJuridiquesByCategorySuccess = createAction(
  '[Engagements] Filter by category success',
  props<{
    payload: (
      | EngagementCommandeModel
      | EngagementDecisionModel
      | EngagementMissionModel
    )[];
  }>()
);
export const GetEngagementJuridiquesByCategoryFailure = createAction(
  '[Engagements] Filter by category failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
