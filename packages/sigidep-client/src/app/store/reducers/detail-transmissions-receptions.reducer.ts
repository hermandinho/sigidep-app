
import { GetTransmissionsReceptionsDetails, GetTransmissionsReceptionsDetailsFailure, GetTransmissionsReceptionsDetailsSuccess } from '@actions/detail-transmissions-receptions.actions';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: any[];
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

const transmissionsReceptionsDetailsReducer = createReducer(
  initialState,
  on(GetTransmissionsReceptionsDetails, (state) => {
    return { ...state, loading: true };
  }),
  on(GetTransmissionsReceptionsDetailsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetTransmissionsReceptionsDetailsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return transmissionsReceptionsDetailsReducer(state, action);
}

export const featureKey = 'transmissionsReceptionsDetails';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
