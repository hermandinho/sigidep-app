import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { EngagementMissionModel } from '@models/engagement-mission.model';

export type CategorieProcedure = 'commande' | 'mission' | 'decision';
export type Engagement =
  | EngagementCommandeModel
  | EngagementDecisionModel
  | EngagementMissionModel;
