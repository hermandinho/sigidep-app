import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetReferencePhysicalUnits,
  GetReferencePhysicalUnitsFailure,
  GetReferencePhysicalUnitsSuccess,
} from '@store/actions';
import { ReferencePhysicalUnitModel } from '@models/index';

export interface State {
  data: ReferencePhysicalUnitModel[];
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
  on(GetReferencePhysicalUnits, (state) => {
    return { ...state, loading: true };
  }),
  on(GetReferencePhysicalUnitsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetReferencePhysicalUnitsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'refPhysicalUnits';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
