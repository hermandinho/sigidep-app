import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetRegions,
  GetRegionsFailure,
  GetRegionsSuccess,
} from '@store/actions';
import { RegionsModel } from '@models/addresses.model';

export interface State {
  data: RegionsModel[];
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
  on(GetRegions, (state) => {
    return { ...state, loading: true };
  }),
  on(GetRegionsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetRegionsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'addresses';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
