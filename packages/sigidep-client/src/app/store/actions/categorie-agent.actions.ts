import { CategorieAgentModel } from '@models/categorie-agent.model';
import { createAction, props } from '@ngrx/store';
export const GetCategoriesAgents = createAction('[CategoriesAgents] Filter');
export const GetCategoriesAgentsSuccess = createAction(
  '[CategoriesAgents] Filter success',
  props<{ payload: CategorieAgentModel[] }>()
);
export const GetCategoriesAgentsFailure = createAction(
  '[CategoriesAgents] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateCategorieAgent = createAction(
  '[CategoriesAgents] Create CategorieAgent',
  props<{ payload: CategorieAgentModel }>()
);
export const CreateCategorieAgentSuccess = createAction(
  '[CategoriesAgents] Create success',
  props<{ payload: CategorieAgentModel }>()
);
export const CreateCategorieAgentFailure = createAction(
  '[CategoriesAgents] Create fail',
  props<{ error?: any }>()
);
