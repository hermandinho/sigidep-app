import {
  CreateTypeProcedure,
  CreateTypeProcedureFailure,
  CreateTypeProcedureSuccess,
  DeleteTypeProcedure,
  DeleteTypeProcedureFailure,
  DeleteTypeProcedureSuccess,
  GetTypesProcedures,
  GetTypesProceduresFailure,
  GetTypesProceduresSuccess,
  UpdateTypeProcedure,
  UpdateTypeProcedureFailure,
  UpdateTypeProcedureSuccess,
} from '@actions/types-procedures.actions';
import { TypeProcedureModel } from '@models/type-procedure.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: TypeProcedureModel[];
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

const typesProceduresReducer = createReducer(
  initialState,
  on(GetTypesProcedures, (state) => {
    return { ...state, loading: true };
  }),
  on(GetTypesProceduresSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetTypesProceduresFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateTypeProcedure, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteTypeProcedure, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteTypeProcedureSuccess, DeleteTypeProcedureFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(UpdateTypeProcedure, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateTypeProcedureSuccess,
    UpdateTypeProcedureSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateTypeProcedureFailure,
    UpdateTypeProcedureFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return typesProceduresReducer(state, action);
}

export const featureKey = 'typesProcedures';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
