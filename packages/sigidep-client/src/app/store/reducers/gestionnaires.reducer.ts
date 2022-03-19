import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetGestionnaires,
  GetGestionnairesSuccess,
  GetGestionnairesFailure,
  UpdateGestionnaire,
  UpdateGestionnaireSuccess,
  UpdateGestionnaireFailure,
  DeleteGestionnaire,
  DeleteGestionnaireSuccess,
  DeleteGestionnaireFailure,
  CreateGestionnaire,
  CreateGestionnaireSuccess,
  CreateGestionnaireFailure,
} from '@store/actions';
import { GestionnaireModel } from '@models/gestionnaire.model';

export interface State {
  data: GestionnaireModel[];
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

const gestionnairesReducer = createReducer(
  initialState,
  on(GetGestionnaires, (state) => {
    return { ...state, loading: true };
  }),
  on(GetGestionnairesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetGestionnairesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteGestionnaire, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteGestionnaireSuccess, DeleteGestionnaireFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(CreateGestionnaire, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateGestionnaireSuccess,
    CreateGestionnaireSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return gestionnairesReducer(state, action);
}

export const featureKey = 'gestionnaires';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
