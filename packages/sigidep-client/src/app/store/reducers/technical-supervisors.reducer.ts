import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetTechnicalSupervisors,
  GetTechnicalSupervisorsFailure,
  GetTechnicalSupervisorsSuccess,
} from '@store/actions';
import { TechnicalSupervisorModel } from '@models/technical-supervisor.model';

export interface State {
  data: TechnicalSupervisorModel[];
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
  on(GetTechnicalSupervisors, (state) => {
    return { ...state, loading: true };
  }),
  on(GetTechnicalSupervisorsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetTechnicalSupervisorsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'technicalSupervisors';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
