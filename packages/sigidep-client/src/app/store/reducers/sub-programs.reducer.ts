import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetSubPrograms,
  GetSubProgramsFailure,
  GetSubProgramsSuccess,
} from '@store/actions';
import { SubProgramModel } from '@models/index';

export interface State {
  data: SubProgramModel[];
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

const authReducer = createReducer(
  initialState,
  on(GetSubPrograms, (state) => {
    return { ...state, loading: true };
  }),
  on(GetSubProgramsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetSubProgramsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'subPrograms';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
