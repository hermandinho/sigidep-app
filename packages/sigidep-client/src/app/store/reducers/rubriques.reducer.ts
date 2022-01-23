import {
  CreateRubrique,
  CreateRubriqueFailure,
  CreateRubriqueSuccess,
  DeleteRubrique,
  DeleteRubriqueFailure,
  DeleteRubriquesuccess,
  GetRubriques,
  GetRubriquesFailure,
  GetRubriquesSuccess,
  UpdateRubrique,
  UpdateRubriqueFailure,
  UpdateRubriquesuccess,
} from '@actions/rubriques.actions';
import { RubriqueModel } from '@models/rubrique.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: RubriqueModel[];
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

const rubriquesReducer = createReducer(
  initialState,
  on(GetRubriques, (state) => {
    return { ...state, loading: true };
  }),
  on(GetRubriquesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetRubriquesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteRubrique, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteRubriquesuccess, DeleteRubriqueFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(CreateRubrique, (state) => {
    return { ...state, loading: true };
  }),
  on(UpdateRubrique, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateRubriqueSuccess, UpdateRubriquesuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateRubriqueFailure, UpdateRubriqueFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return rubriquesReducer(state, action);
}

export const featureKey = 'rubriques';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
