import {
  CancelBonsEngagementsReservation,
  CancelBonsEngagementsReservationFailure,
  CancelBonsEngagementsReservationSuccess,
  CreateBonsEngagements,
  CreateBonsEngagementsFailure,
  CreateBonsEngagementsSuccess,
  DeleteBonsEngagements,
  DeleteBonsEngagementsFailure,
  DeleteBonsEngagementsSuccess,
  GetBonsEngagements,
  GetBonsEngagementsFailure,
  GetBonsEngagementsSuccess,
  GetTransmissionsReceptionsBons,
  GetTransmissionsReceptionsBonsFailure,
  GetTransmissionsReceptionsBonsSuccess,
  UpdateBonsEngagements,
  UpdateBonsEngagementsFailure,
  UpdateBonsEngagementsSuccess,
} from '@actions/bons-engagements.actions';
import { BonEngagementModel } from '@models/bon-engagement.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: BonEngagementModel[];
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

const bonsEngagementsReducer = createReducer(
  initialState,
  on(GetBonsEngagements, (state) => {
    return { ...state, loading: true };
  }),
  on(GetBonsEngagementsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetBonsEngagementsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(GetTransmissionsReceptionsBons, (state) => {
    return { ...state, loading: true };
  }),
  on(GetTransmissionsReceptionsBonsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetTransmissionsReceptionsBonsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(CreateBonsEngagements, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteBonsEngagements, (state, { id }) => {
    return { ...state, loading1: true };
  }),
  on(
    DeleteBonsEngagementsSuccess,
    DeleteBonsEngagementsFailure,
    (state, {}) => {
      return { ...state, loading: false };
    }
  ),
  on(UpdateBonsEngagements, (state) => {
    return { ...state, loading: true };
  }),
  on(CancelBonsEngagementsReservation, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateBonsEngagementsSuccess,
    UpdateBonsEngagementsSuccess,
    CancelBonsEngagementsReservationSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateBonsEngagementsFailure,
    UpdateBonsEngagementsFailure,
    CancelBonsEngagementsReservationFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return bonsEngagementsReducer(state, action);
}

export const featureKey = 'mandatsPrimes';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
