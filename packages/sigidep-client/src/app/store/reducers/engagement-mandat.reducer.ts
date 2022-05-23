import {
  CancelEngagementMandatsReservation,
  CancelEngagementMandatsReservationFailure,
  CancelEngagementMandatsReservationSuccess,
  CreateEngagementMandats,
  CreateEngagementMandatsFailure,
  CreateEngagementMandatsSuccess,
  DeleteEngagementMandats,
  DeleteEngagementMandatsFailure,
  DeleteEngagementMandatsSuccess,
  GetEngagementMandats,
  GetEngagementMandatsFailure,
  GetEngagementMandatsSuccess,
  UpdateEngagementMandats,
  UpdateEngagementMandatsFailure,
  UpdateEngagementMandatsSuccess,
} from '@actions/engagement-mandat.actions';
import { EngagementMandatModel } from '@models/engagement-mandat.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: EngagementMandatModel[];
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

const engagementMandatsReducer = createReducer(
  initialState,
  on(GetEngagementMandats, (state) => {
    return { ...state, loading: true };
  }),
  on(GetEngagementMandatsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetEngagementMandatsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(CreateEngagementMandats, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteEngagementMandats, (state, { id }) => {
    return { ...state, loading1: true };
  }),
  on(
    DeleteEngagementMandatsSuccess,
    DeleteEngagementMandatsFailure,
    (state, {}) => {
      return { ...state, loading: false };
    }
  ),
  on(UpdateEngagementMandats, (state) => {
    return { ...state, loading: true };
  }),
  on(CancelEngagementMandatsReservation, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateEngagementMandatsSuccess,
    UpdateEngagementMandatsSuccess,
    CancelEngagementMandatsReservationSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateEngagementMandatsFailure,
    UpdateEngagementMandatsFailure,
    CancelEngagementMandatsReservationFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return engagementMandatsReducer(state, action);
}

export const featureKey = 'mandatsPrimes';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(
  userState,
  (state) => state.data
);
//export const getDataSelector = createSelector(userState, (state) => state.data);
