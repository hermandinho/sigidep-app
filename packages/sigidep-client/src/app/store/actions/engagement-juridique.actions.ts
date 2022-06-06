import { EngagementJuridiqueModel } from '@models/engagement-juridique.model';
import { createAction, props } from '@ngrx/store';
export const GetEngagementJuridiques = createAction(
  '[EngagementJuridiques] Filter',
  props<{ procedures?: string[]; etats?: string[]; numeros?: string; imputation?: string  }>()
);
export const GetEngagementJuridiquesSuccess = createAction(
  '[EngagementJuridiques] Filter success',
  props<{ payload: EngagementJuridiqueModel[] }>()
);
export const GetEngagementJuridiquesFailure = createAction(
  '[EngagementJuridiques] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateEngagementJuridique = createAction(
  '[EngagementJuridiques] Create engagement',
  props<{ payload: EngagementJuridiqueModel }>()
);
export const CreateEngagementJuridiqueSuccess = createAction(
  '[EngagementJuridiques] Create engagement',
  props<{ payload: EngagementJuridiqueModel }>()
);
export const CreateEngagementJuridiqueFailure = createAction(
  '[EngagementJuridiques] Create engagement',
  props<{ error?: any }>()
);

export const DeleteEngagement = createAction(
  '[EngagementJuridiques] Delete',
  props<{ id: number }>()
);
export const DeleteEngagementSuccess = createAction(
  '[EngagementJuridiques] Delete success'
);
export const DeleteEngagementFailure = createAction(
  '[EngagementJuridiques] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateEngagement = createAction(
  '[EngagementJuridiques] Update',
  props<{ payload: EngagementJuridiqueModel }>()
);
export const UpdateEngagementSuccess = createAction(
  '[EngagementJuridiques] Update success',
  props<{ payload: EngagementJuridiqueModel }>()
);
export const UpdateEngagementFailure = createAction(
  '[EngagementJuridiques] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CancelEngagementReservation = createAction(
  '[EngagementJuridiques] Cancel',
  props<{ payload: EngagementJuridiqueModel }>()
);
export const CancelEngagementReservationSuccess = createAction(
  '[EngagementJuridiques] Cancel success',
  props<{ payload: EngagementJuridiqueModel }>()
);
export const CancelEngagementReservationFailure = createAction(
  '[EngagementJuridiques] Cancel failure',
  props<{ error?: any }>() // TODO defile errors global model here
);


