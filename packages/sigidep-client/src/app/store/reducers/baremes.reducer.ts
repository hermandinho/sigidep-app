import {
  CreateBareme,
  CreateBaremeFailure,
  CreateBaremeSuccess,
  DeleteBareme,
  DeleteBaremeFailure,
  DeleteBaremeSuccess,
  GetBaremes,
  GetBaremesFailure,
  GetBaremesSuccess,
  UpdateBareme,
  UpdateBaremeFailure,
  UpdateBaremeSuccess,
} from '@actions/baremes.actions';
import { BaremeMissionModel } from '@models/bareme-mission.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: BaremeMissionModel[];
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

const baremesReducer = createReducer(
  initialState,
  on(GetBaremes, (state) => {
    return { ...state, loading: true };
  }),
  on(GetBaremesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetBaremesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateBareme, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteBareme, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteBaremeSuccess, DeleteBaremeFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(UpdateBareme, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateBaremeSuccess, UpdateBaremeSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateBaremeFailure, UpdateBaremeFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return baremesReducer(state, action);
}

export const featureKey = 'baremes';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
