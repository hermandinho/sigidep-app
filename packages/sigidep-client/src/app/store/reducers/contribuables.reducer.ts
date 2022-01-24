import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  CreateContribuable,
  CreateContribuableSuccess,
  DeleteContribuable,
  DeleteContribuableFailure,
  DeleteContribuableSuccess,
  GetContribuables,
  GetContribuablesFailure,
  GetContribuablesSuccess,
  UpdateContribuableSuccess,
} from '@actions/contribuables.actions';
import { ContribuableModel } from '@models/contribuable.model';

export interface State {
  data: ContribuableModel[];
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
  on(GetContribuables, (state) => {
    return { ...state, loading: true };
  }),
  on(GetContribuablesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetContribuablesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteContribuable, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteContribuableSuccess, DeleteContribuableFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(CreateContribuable, (state) => {
    return { ...state, loading: true };
  }),
  on(
    CreateContribuableSuccess,
    UpdateContribuableSuccess,
    (state, { payload }) => {
      return { ...state, loading: false, data: [payload] };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return contribuablesReducer(state, action);
}

export const featureKey = 'contribuables';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
