import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { GetBanks, GetBanksFailure, GetBanksSuccess } from '@store/actions';
import { BankModel } from '@models/index';

export interface State {
  data: BankModel[];
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

const banksAgencesReducer = createReducer(
  initialState,
  on(GetBanks, (state) => {
    return { ...state, loading: true };
  }),
  on(GetBanksSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetBanksFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return banksAgencesReducer(state, action);
}

export const FeatureKey = 'banksAgences';

const bankAgengeState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  bankAgengeState,
  (state) => state.loading
);
export const getDataSelector = createSelector(
  bankAgengeState,
  (state) => state.data
);
