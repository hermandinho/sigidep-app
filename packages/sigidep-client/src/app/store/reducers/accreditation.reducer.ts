import {
  CreateAccreditations,
  CreateAccreditationsFailure,
  CreateAccreditationsSuccess,
  DeleteAccreditations,
  DeleteAccreditationsFailure,
  DeleteAccreditationsSuccess,
  GetAccreditations,
  GetAccreditationsByGestionnaire,
  GetAccreditationsByGestionnaireFailure,
  GetAccreditationsByGestionnaireSuccess,
  GetAccreditationsFailure,
  GetAccreditationsSuccess,
} from '@actions/accreditaions.actions';
import { AccreditationGestionnaireModel } from '@models/accreditation-gestionnaire.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: AccreditationGestionnaireModel[];
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

const accreditationsReducer = createReducer(
  initialState,
  on(GetAccreditations, (state) => {
    return { ...state, loading: true };
  }),
  on(GetAccreditationsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetAccreditationsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateAccreditations, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteAccreditations, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteAccreditationsSuccess, DeleteAccreditationsFailure, (state, {}) => {
    return { ...state, loading: false };
  }),

  on(CreateAccreditationsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateAccreditationsFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  }),

  on(GetAccreditationsByGestionnaire, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(GetAccreditationsByGestionnaireSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetAccreditationsByGestionnaireFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return accreditationsReducer(state, action);
}

export const featureKey = 'accreditations';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
