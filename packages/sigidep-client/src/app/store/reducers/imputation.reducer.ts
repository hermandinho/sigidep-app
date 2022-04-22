
import {
  GetEncours,
  GetEncoursFailure,
  GetEncoursSuccess,
} from '@actions/encours.actions';
import { GetImputations, GetImputationsFailure, GetImputationsSuccess } from '@actions/imputations.actions';
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

const imputationsReducer = createReducer(
  initialState,
  on(GetImputations, (state) => {
    return { ...state, loading: true };
  }),
  on(GetImputationsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetImputationsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return imputationsReducer(state, action);
}

export const featureKey = 'imputations';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
