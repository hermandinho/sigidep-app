import {
  CreateCarnetMandat,
  CreateCarnetMandatFailure,
  CreateCarnetMandatSuccess,
  DeleteCarnetMandat,
  DeleteCarnetMandatFailure,
  DeleteCarnetMandatSuccess,
  GetCarnetMandats,
  GetCarnetMandatsFailure,
  GetCarnetMandatsSuccess,
  UpdateCarnetMandat,
  UpdateCarnetMandatFailure,
  UpdateCarnetMandatSuccess,
} from '@actions/carnets-mandats.actions';
import { CarnetMandatModel } from '@models/carnet-mandat.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: CarnetMandatModel[];
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

const carnetMandatsReducer = createReducer(
  initialState,
  on(GetCarnetMandats, (state) => {
    return { ...state, loading: true };
  }),
  on(GetCarnetMandatsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetCarnetMandatsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteCarnetMandat, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteCarnetMandatSuccess, DeleteCarnetMandatFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(CreateCarnetMandat, (state) => {
    return { ...state, loading: true };
  }),
  on(UpdateCarnetMandat, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateCarnetMandatSuccess,
    UpdateCarnetMandatSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateCarnetMandatFailure,
    UpdateCarnetMandatFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return carnetMandatsReducer(state, action);
}

export const featureKey = 'carnetsMandats';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
