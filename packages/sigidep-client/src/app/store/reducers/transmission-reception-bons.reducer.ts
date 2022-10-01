import { BonEngagementModel } from '@models/bon-engagement.model';
import { GetTransmissionsReceptionsBons, GetTransmissionsReceptionsBonsSuccess, GetTransmissionsReceptionsBonsFailure } from '../actions/transmission-reception-bons.actions';
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

const transmissionReceptionBonsReducer = createReducer(
  initialState,
  on(GetTransmissionsReceptionsBons, (state) => {
    return { ...state, loading: true };
  }),
  on(GetTransmissionsReceptionsBonsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetTransmissionsReceptionsBonsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return transmissionReceptionBonsReducer(state, action);
}

export const featureKey = 'transBons';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
