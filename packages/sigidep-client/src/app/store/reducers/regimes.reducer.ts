import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import {
  CreateRegimeFiscal,
  CreateRegimeFiscalSuccess,
  GetRegimes,
  GetRegimesFailure,
  GetRegimesSuccess,
} from '@actions/regimes.actions';
import { RegimeFiscalModel } from '@models/regime-fiscal.model';

export interface State {
  data: RegimeFiscalModel[];
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

const regimesReducer = createReducer(
  initialState,
  on(GetRegimes, (state) => {
    return { ...state, loading: true };
  }),
  on(GetRegimesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetRegimesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateRegimeFiscal, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateRegimeFiscalSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return regimesReducer(state, action);
}

export const featureKey = 'regimes';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
