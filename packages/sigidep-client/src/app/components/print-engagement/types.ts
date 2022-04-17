import {
  EngagementCommandeModel,
  EngagementMissionModel,
  EngagementDecisionModel,
} from '@models/index';

export type Engagement =
  | EngagementCommandeModel
  | EngagementMissionModel
  | EngagementDecisionModel
  | any;
