import { ExecTaxesModel } from '@models/exec-taxes.model';
import {
  Createtaxe,
  CreateTaxeFailure,
  CreateTaxesuccess,
  DeleteTaxe,
  DeleteTaxeFailure,
  DeleteTaxeSuccess,
  GetTaxes,
  GetTaxesFailure,
  GetTaxesSuccess,
  UpdateTaxe,
  UpdateTaxeFailure,
  UpdateTaxeSuccess,
} from '@actions/exec-taxes.actions';

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: ExecTaxesModel[];
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

const TaxesReducer = createReducer(
  initialState,
  on(GetTaxes, (state) => {
    return { ...state, loading: true };
  }),
  on(GetTaxesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetTaxesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(Createtaxe, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteTaxe, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteTaxeSuccess, DeleteTaxeFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(UpdateTaxe, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateTaxesuccess, UpdateTaxeSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateTaxeFailure, UpdateTaxeFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return TaxesReducer(state, action);
}

export const featureKey = 'taxes';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
