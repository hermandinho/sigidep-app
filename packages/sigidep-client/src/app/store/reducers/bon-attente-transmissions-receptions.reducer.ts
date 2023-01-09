

import { GetTransmissionsReceptionsBons, GetTransmissionsReceptionsBonsFailure, GetTransmissionsReceptionsBonsSuccess } from '@actions/transmissions-receptions.actions';
import { TransmissionsReceptionModel } from '@models/transmission-reception.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: TransmissionsReceptionModel[];
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

const bonAttenteTransmissionsReceptionsReducer = createReducer(
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
  return bonAttenteTransmissionsReceptionsReducer(state, action);
}

export const featureKey = 'bonAttenteTransmissionsReceptions';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
