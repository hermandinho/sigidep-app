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
  data1: EngagementMandatModel[];
  loading1: boolean;
  error: any;
}

export const initialState: State = {
  data1: [],
  loading1: false,
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
    return { ...state, loading1: true };
  }),
  on(GetEngagementMandatsSuccess, (state, { payload }) => {
    return { ...state, loading1: false, data1: payload };
  }),
  on(GetEngagementMandatsFailure, (state, { error }) => {
    return { ...state, loading1: false, error };
  }),
  on(CreateEngagementMandats, (state) => {
    return { ...state, loading1: true };
  }),
  on(DeleteEngagementMandats, (state, { id }) => {
    return { ...state, loading1: true };
  }),
  on(
    DeleteEngagementMandatsSuccess,
    DeleteEngagementMandatsFailure,
    (state, {}) => {
      return { ...state, loading1: false };
    }
  ),
  on(UpdateEngagementMandats, (state) => {
    return { ...state, loading1: true };
  }),
  on(CancelEngagementMandatsReservation, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateEngagementMandatsSuccess,
    UpdateEngagementMandatsSuccess,
    CancelEngagementMandatsReservationSuccess,
    (state, { payload }) => {
      return { ...state, loading1: false, data1: [payload] };
    }
  ),
  on(
    CreateEngagementMandatsFailure,
    UpdateEngagementMandatsFailure,
    CancelEngagementMandatsReservationFailure,
    (state, { error }) => {
      return { ...state, loading1: false, error: error };
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
  (state) => state.loading1
);
export const getDataSelector = createSelector(
  userState,
  (state) => state.data1
);
