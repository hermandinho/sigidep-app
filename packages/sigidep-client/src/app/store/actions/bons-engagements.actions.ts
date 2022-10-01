import { BonEngagementModel } from '@models/bon-engagement.model';
import { FactureArticleModel } from '@models/facture-article.model';
import { createAction, props } from '@ngrx/store';
export const GetBonsEngagements = createAction(
  '[Bons] Filter',
  props<{
    procedures?: string[];
    etats?: string[];
    numeros?: string[];
    imputation?: string[];
  }>()
);

export const GetFactureArticles = createAction(
  '[Mandat] Filter Facture Articles',
  props<{
    factureId?: number;
  }>()
);
export const GetFactureArticlesSuccess = createAction(
  '[Bons] Filter Facture Articles success',
  props<{ payload: FactureArticleModel[] }>()
);
export const GetFactureArticlesFailure = createAction(
  '[Bons]  Filter Facture Articles failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
export const GetBonsEngagementsSuccess = createAction(
  '[Bons] Filter success',
  props<{ payload: BonEngagementModel[] }>()
);
export const GetBonsEngagementsFailure = createAction(
  '[Bons] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateBonsEngagements = createAction(
  '[Bons] Create engagement',
  props<{ payload: BonEngagementModel }>()
);
export const CreateBonsEngagementsSuccess = createAction(
  '[Bons] Create engagement',
  props<{ payload: BonEngagementModel }>()
);
export const CreateBonsEngagementsFailure = createAction(
  '[Bons] Create engagement',
  props<{ error?: any }>()
);

export const DeleteBonsEngagements = createAction(
  '[Bons] Delete',
  props<{ id: number }>()
);
export const DeleteBonsEngagementsSuccess = createAction(
  '[Bons] Delete success'
);
export const DeleteBonsEngagementsFailure = createAction(
  '[Bons] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateBonsEngagements = createAction(
  '[Bons] Update',
  props<{ payload: BonEngagementModel }>()
);
export const UpdateBonsEngagementsSuccess = createAction(
  '[Bons] Update success',
  props<{ payload: BonEngagementModel }>()
);
export const UpdateBonsEngagementsFailure = createAction(
  '[Bons] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CancelBonsEngagementsReservation = createAction(
  '[Bons] Cancel',
  props<{
    payload: any;
  }>()
);
export const CancelBonsEngagementsReservationSuccess = createAction(
  '[Bons] Cancel success',
  props<{ payload: BonEngagementModel }>()
);
export const CancelBonsEngagementsReservationFailure = createAction(
  '[Bons] Cancel failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
