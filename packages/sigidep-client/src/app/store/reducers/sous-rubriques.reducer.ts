import {
  CreateSousRubrique,
  CreateSousRubriqueFailure,
  CreateSousRubriqueSuccess,
  DeleteSousRubrique,
  DeleteSousRubriqueFailure,
  DeleteSousRubriquesuccess,
  GetSousRubriques,
  GetSousRubriquesFailure,
  GetSousRubriquesSuccess,
  UpdateSousRubrique,
  UpdateSousRubriqueFailure,
  UpdateSousRubriqueSuccess,
} from '@actions/sous-rubriques.actions';
import { SousRubriqueModel } from '@models/sous-rubrique.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: SousRubriqueModel[];
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

const sousRubriquesReducer = createReducer(
  initialState,
  on(GetSousRubriques, (state) => {
    return { ...state, loading: true };
  }),
  on(GetSousRubriquesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetSousRubriquesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteSousRubrique, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteSousRubriquesuccess, DeleteSousRubriqueFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(CreateSousRubrique, (state) => {
    return { ...state, loading: true };
  }),
  on(UpdateSousRubrique, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateSousRubriqueSuccess,
    UpdateSousRubriqueSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  ),
  on(
    CreateSousRubriqueFailure,
    UpdateSousRubriqueFailure,
    (state, { error }) => {
      return { ...state, loading: false, error: error };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return sousRubriquesReducer(state, action);
}

export const featureKey = 'sousRubriques';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
