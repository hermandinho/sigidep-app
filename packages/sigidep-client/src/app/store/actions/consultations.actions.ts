import { EncoursModel } from '@models/encours.model';
import { createAction, props } from '@ngrx/store';
export const GetImputations = createAction(
  '[Encours] Filter',
  props<{ imputation: string }>()
);
export const GetImputationsSuccess = createAction(
  '[Encours] Filter success',
  props<{ payload: EncoursModel[] }>()
);
export const GetImputationsFailure = createAction(
  '[Encours] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

//certificat d'engagement
export const GetCertificatEngagements = createAction(
  '[EngagementJuridique] Filter',
  props<{ engagement: string }>()
);
export const GetCertificatEngagementsSuccess = createAction(
  '[EngagementJuridique] Filter success',
  props<{ payload: EncoursModel[] }>()
);
export const GetCertificatEngagementsFailure = createAction(
  '[EngagementJuridique] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
