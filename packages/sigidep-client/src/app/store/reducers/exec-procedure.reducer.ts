import {
  CreateProcedure,
  CreateProcedureFailure,
  CreateProcedureSuccess,
  DeleteProcedure,
  DeleteProcedureFailure,
  DeleteProcedureSuccess,
  GetProcedures,
  GetProceduresFailure,
  GetProceduresSuccess,
  UpdateProcedure,
  UpdateProcedureFailure,
  UpdateProcedureSuccess,
} from '@actions/exec-procedure.actions';
import { ExecProcedureModel } from '@models/exec-procedure.model';

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: ExecProcedureModel[];
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

const proceduresReducer = createReducer(
  initialState,
  on(GetProcedures, (state) => {
    return { ...state, loading: true };
  }),
  on(GetProceduresSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetProceduresFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateProcedure, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteProcedure, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteProcedureSuccess, DeleteProcedureFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(UpdateProcedure, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateProcedureSuccess, UpdateProcedureSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateProcedureFailure, UpdateProcedureFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return proceduresReducer(state, action);
}

export const featureKey = 'procedures';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
