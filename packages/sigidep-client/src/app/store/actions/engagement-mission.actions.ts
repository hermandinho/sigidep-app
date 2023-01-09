import { EngagementMissionModel } from '@models/engagement-mission.model';
import { createAction, props } from '@ngrx/store';
export const GetEngagementMissions = createAction(
  '[EngagementMissions] Filter',
  props<{ procedures?: string[]; etats?: string[]; numeros?: string[] }>()
);
export const GetEngagementMissionsSuccess = createAction(
  '[EngagementMissions] Filter success',
  props<{ payload: EngagementMissionModel[] }>()
);
export const GetEngagementMissionsFailure = createAction(
  '[EngagementMissions] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateEngagementMission = createAction(
  '[EngagementMissions] Create engagement',
  props<{ payload: EngagementMissionModel }>()
);
export const CreateEngagementMissionsuccess = createAction(
  '[EngagementMissions] Create engagement',
  props<{ payload: EngagementMissionModel }>()
);
export const CreateEngagementMissionFailure = createAction(
  '[EngagementMissions] Create engagement',
  props<{ error?: any }>()
);

export const DeleteEngagementMission = createAction(
  '[EngagementMissions] Delete',
  props<{ id: number }>()
);
export const DeleteEngagementMissionSuccess = createAction(
  '[EngagementMissions] Delete success'
);
export const DeleteEngagementMissionFailure = createAction(
  '[EngagementMissions] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateEngagementMission = createAction(
  '[EngagementMissions] Update',
  props<{ payload: EngagementMissionModel }>()
);
export const UpdateEngagementMissionSuccess = createAction(
  '[EngagementMissions] Update success',
  props<{ payload: EngagementMissionModel }>()
);
export const UpdateEngagementMissionFailure = createAction(
  '[EngagementMissions] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
