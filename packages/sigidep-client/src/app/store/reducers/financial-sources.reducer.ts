import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetFinancialSources,
  GetFinancialSourcesFailure,
  GetFinancialSourcesSuccess,
} from '@store/actions';
import { FinancialSourceModel } from '@models/financial-source.model';

export interface State {
  data: FinancialSourceModel[];
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

const authReducer = createReducer(
  initialState,
  on(GetFinancialSources, (state) => {
    return { ...state, loading: true };
  }),
  on(GetFinancialSourcesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetFinancialSourcesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'financialSources';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
