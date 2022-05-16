import { EngagementMissionModel } from '@models/engagement-mission.model';
import {
  CreateEngagementMission,
  CreateEngagementMissionFailure,
  CreateEngagementMissionsuccess,
  DeleteEngagementMission,
  DeleteEngagementMissionFailure,
  DeleteEngagementMissionSuccess,
  GetEngagementMissionPrime,
  GetEngagementMissionPrimeFailure,
  GetEngagementMissionPrimeSuccess,
  GetEngagementMissions,
  GetEngagementMissionsFailure,
  GetEngagementMissionsSuccess,
  UpdateEngagementMission,
  UpdateEngagementMissionFailure,
  UpdateEngagementMissionSuccess,
} from '@actions/engagement-mission.actions';

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: EngagementMissionModel[];
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

const engagementMissionsReducer = createReducer(
  initialState,
  on(GetEngagementMissions, (state) => {
    return { ...state, loading: true };
  }),
  on(GetEngagementMissionsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetEngagementMissionsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(GetEngagementMissionPrime, (state) => {
    return { ...state, loading: true };
  }),
  on(GetEngagementMissionPrimeSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetEngagementMissionPrimeFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateEngagementMission, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteEngagementMission, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(
    DeleteEngagementMissionSuccess,
    DeleteEngagementMissionFailure,
    (state, {}) => {
      return { ...state, loading: false };
    }
  ),
  on(UpdateEngagementMission, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateEngagementMissionsuccess,
    UpdateEngagementMissionSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateEngagementMissionFailure,
    UpdateEngagementMissionFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return engagementMissionsReducer(state, action);
}

export const featureKey = 'missions';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
