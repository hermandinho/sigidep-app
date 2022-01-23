import {
  CreateCategorieAgent,
  CreateCategorieAgentFailure,
  CreateCategorieAgentSuccess,
  GetCategoriesAgents,
  GetCategoriesAgentsFailure,
  GetCategoriesAgentsSuccess,
} from '@actions/categorie-agent.actions';

import { CategorieAgentModel } from '@models/categorie-agent.model';

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: CategorieAgentModel[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: [],
  loading: false,
  error: {
    error: '',
    message: '',
    details: '',
    statusCode: 0,
  },
};

const categoriesAgentsReducer = createReducer(
  initialState,
  on(GetCategoriesAgents, (state) => {
    return { ...state, loading: true };
  }),
  on(GetCategoriesAgentsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetCategoriesAgentsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateCategorieAgent, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateCategorieAgentSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateCategorieAgentFailure, (state, { error }) => {
    return { ...state, loading: false };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return categoriesAgentsReducer(state, action);
}

export const featureKey = 'categoriesAgents';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
