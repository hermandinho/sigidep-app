import {
  CreateEncours,
  CreateEncoursFailure,
  CreateEncoursSuccess,
  DeleteEncours,
  DeleteEncoursFailure,
  DeleteEncoursSuccess,
  GetEncours,
  GetEncoursFailure,
  GetEncoursSuccess,
} from '@actions/encours.actions';
import { EncoursModel } from '@models/encours.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: EncoursModel[];
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

const encoursReducer = createReducer(
  initialState,
  on(GetEncours, (state) => {
    return { ...state, loading: true };
  }),
  on(GetEncoursSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetEncoursFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateEncours, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteEncours, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteEncoursSuccess, DeleteEncoursFailure, (state, {}) => {
    return { ...state, loading: false };
  }),

  on(CreateEncoursSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateEncoursFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return encoursReducer(state, action);
}

export const featureKey = 'encours';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
