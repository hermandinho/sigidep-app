import {
  DeleteEngagementDecisionFailure,
  DeleteEngagementDecisionSuccess,
} from '@actions/engagement-decision.actions';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import {
  CreateEngagementDecision,
  CreateEngagementDecisionFailure,
  CreateEngagementDecisionsuccess,
  DeleteEngagementDecision,
  GetEngagementDecisions,
  GetEngagementDecisionsFailure,
  GetEngagementDecisionsSuccess,
  UpdateEngagementDecision,
  UpdateEngagementDecisionFailure,
  UpdateEngagementDecisionSuccess,
} from '@actions/engagement-decision.actions';

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: EngagementDecisionModel[];
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

const engagementDecisionsReducer = createReducer(
  initialState,
  on(GetEngagementDecisions, (state) => {
    return { ...state, loading: true };
  }),
  on(GetEngagementDecisionsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetEngagementDecisionsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateEngagementDecision, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteEngagementDecision, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(
    DeleteEngagementDecisionSuccess,
    DeleteEngagementDecisionFailure,
    (state, {}) => {
      return { ...state, loading: false };
    }
  ),
  on(UpdateEngagementDecision, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateEngagementDecisionsuccess,
    UpdateEngagementDecisionSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateEngagementDecisionFailure,
    UpdateEngagementDecisionFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return engagementDecisionsReducer(state, action);
}

export const featureKey = 'decisions';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
