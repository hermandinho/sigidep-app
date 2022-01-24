import { ContribuableBugetaireModel } from './../../models/contribuable-budgetaire.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetContribuablesBugetaires,
  GetContribuablesBugetairesSuccess,
  GetContribuablesBugetairesFailure,
  UpdateContribuableBugetaire,
  UpdateContribuableBugetaireSuccess,
  UpdateContribuableBugetaireFailure,
  DeleteContribuableBugetaire,
  DeleteContribuableBugetaireSuccess,
  DeleteContribuableBugetaireFailure,
  CreateContribuableBugetaire,
  CreateContribuableBugetaireSuccess,
  CreateContribuableBugetaireFailure,
} from '@store/actions';

export interface State {
  data: ContribuableBugetaireModel[];
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

const contribuablesReducer = createReducer(
  initialState,
  on(GetContribuablesBugetaires, (state) => {
    return { ...state, loading: true };
  }),
  on(GetContribuablesBugetairesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetContribuablesBugetairesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteContribuableBugetaire, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(
    DeleteContribuableBugetaireSuccess,
    DeleteContribuableBugetaireFailure,
    (state, {}) => {
      return { ...state, loading: false };
    }
  ),
  on(CreateContribuableBugetaire, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateContribuableBugetaireSuccess,
    UpdateContribuableBugetaireSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return contribuablesReducer(state, action);
}

export const featureKey = 'contribuablesBudgetaires';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
