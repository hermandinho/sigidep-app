import {
  GetEngagementJuridiquesByCategory,
  GetEngagementJuridiquesByCategoryFailure,
  GetEngagementJuridiquesByCategorySuccess,
} from '@actions/engagements.actions';

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { EngagementMissionModel } from '@models/engagement-mission.model';

export interface State {
  data: (
    | EngagementCommandeModel
    | EngagementDecisionModel
    | EngagementMissionModel
  )[];
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

const engagementsReducer = createReducer(
  initialState,

  on(GetEngagementJuridiquesByCategory, (state) => {
    return { ...state, loading: true };
  }),
  on(GetEngagementJuridiquesByCategorySuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetEngagementJuridiquesByCategoryFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return engagementsReducer(state, action);
}

export const featureKey = 'engagementsByCategory';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
