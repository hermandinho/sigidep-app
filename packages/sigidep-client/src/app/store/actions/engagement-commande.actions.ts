import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { createAction, props } from '@ngrx/store';
export const GetEngagementCommandes = createAction(
  '[EngagementCommandes] Filter',
  props<{ procedures?: string[]; etats?: string[]; numeros?: string[] }>()
);
export const GetEngagementCommandesSuccess = createAction(
  '[EngagementCommandes] Filter success',
  props<{ payload: EngagementCommandeModel[] }>()
);
export const GetEngagementCommandesFailure = createAction(
  '[EngagementCommandes] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateEngagementCommande = createAction(
  '[EngagementCommandes] Create engagement',
  props<{ payload: EngagementCommandeModel }>()
);
export const CreateEngagementCommandesuccess = createAction(
  '[EngagementCommandes] Create engagement',
  props<{ payload: EngagementCommandeModel }>()
);
export const CreateEngagementCommandeFailure = createAction(
  '[EngagementCommandes] Create engagement',
  props<{ error?: any }>()
);

export const DeleteEngagementCommande = createAction(
  '[EngagementCommandes] Delete',
  props<{ id: number }>()
);
export const DeleteEngagementCommandeSuccess = createAction(
  '[EngagementCommandes] Delete success'
);
export const DeleteEngagementCommandeFailure = createAction(
  '[EngagementCommandes] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateEngagementCommande = createAction(
  '[EngagementMissions] Update',
  props<{ payload: EngagementCommandeModel }>()
);
export const UpdateEngagementCommandeSuccess = createAction(
  '[EngagementMissions] Update success',
  props<{ payload: EngagementCommandeModel }>()
);
export const UpdateEngagementCommandeFailure = createAction(
  '[EngagementMissions] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
