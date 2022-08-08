
import { CreateTransmissionsReception, CreateTransmissionsReceptionFailure, CreateTransmissionsReceptionSuccess, DeleteTransmissionsReception, DeleteTransmissionsReceptionFailure, DeleteTransmissionsReceptionSuccess, GetTransmissionsReceptions, GetTransmissionsReceptionsFailure, GetTransmissionsReceptionsSuccess, UpdateTransmissionsReception, UpdateTransmissionsReceptionFailure, UpdateTransmissionsReceptionSuccess } from '@actions/transmissions-receptions.actions';
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

const transmissionsReceptionsReducer = createReducer(
  initialState,
  on(GetTransmissionsReceptions, (state) => {
    return { ...state, loading: true };
  }),
  on(GetTransmissionsReceptionsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetTransmissionsReceptionsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteTransmissionsReception, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteTransmissionsReceptionSuccess, DeleteTransmissionsReceptionFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(CreateTransmissionsReception, (state) => {
    return { ...state, loading: true };
  }),
  on(UpdateTransmissionsReception, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateTransmissionsReceptionSuccess,
    UpdateTransmissionsReceptionSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateTransmissionsReceptionFailure,
    UpdateTransmissionsReceptionFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return transmissionsReceptionsReducer(state, action);
}

export const featureKey = 'transmissionsReceptions';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
