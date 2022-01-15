import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetContribuables,
  GetContribuablesFailure,
  GetContribuablesSuccess,
} from '@actions/contribuables.actions';
import { ContribuableModel } from '@models/contribuable.model';

export interface State {
  data: ContribuableModel[];
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
  on(GetContribuables, (state) => {
    return { ...state, loading: true };
  }),
  on(GetContribuablesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetContribuablesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'contribuables';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
