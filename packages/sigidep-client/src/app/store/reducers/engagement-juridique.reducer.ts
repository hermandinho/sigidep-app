import {
  CancelEngagementReservation,
  CancelEngagementReservationFailure,
  CancelEngagementReservationSuccess,
  CreateEngagementJuridique,
  CreateEngagementJuridiqueFailure,
  CreateEngagementJuridiqueSuccess,
  DeleteEngagement,
  DeleteEngagementFailure,
  DeleteEngagementSuccess,
  GetEngagementJuridiques,
  GetEngagementJuridiquesFailure,
  GetEngagementJuridiquesSuccess,
  UpdateEngagement,
  UpdateEngagementFailure,
  UpdateEngagementSuccess,
} from '@actions/engagement-juridique.actions';

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { EngagementJuridiqueModel } from '@models/engagement-juridique.model';

export interface State {
  data: EngagementJuridiqueModel[];
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

const engagementJuridiquesReducer = createReducer(
  initialState,
  on(GetEngagementJuridiques, (state) => {
    return { ...state, loading: true };
  }),
  on(GetEngagementJuridiquesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetEngagementJuridiquesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateEngagementJuridique, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteEngagement, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteEngagementSuccess, DeleteEngagementFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(UpdateEngagement, (state) => {
    return { ...state, loading: true };
  }),
  on(CancelEngagementReservation, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateEngagementJuridiqueSuccess,
    UpdateEngagementSuccess,
    CancelEngagementReservationSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateEngagementJuridiqueFailure,
    UpdateEngagementFailure,
    CancelEngagementReservationFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return engagementJuridiquesReducer(state, action);
}

export const featureKey = 'engagements';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
