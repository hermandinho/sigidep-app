import {
  CreateVirement,
  CreateVirementFailure,
  CreateVirementSuccess,
  DeleteVirement,
  DeleteVirementFailure,
  DeleteVirementSuccess,
  GetVirement,
  GetVirementsFailure,
  GetVirementsSuccess,
  UpdateVirement,
  UpdateVirementFailure,
  UpdateVirementSuccess,
} from '@actions/virement.actions';
import { VirementModele } from '@models/index';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: VirementModele[];
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

const virementReducer = createReducer(
  initialState,
  on(GetVirement, (state) => {
    return { ...state, loading: true };
  }),
  on(GetVirementsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetVirementsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteVirement, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteVirementSuccess, DeleteVirementFailure, (state, { }) => {
    return { ...state, loading: false };
  }),
  on(CreateVirement, (state) => {
    return { ...state, loading: true };
  }),
  on(UpdateVirement, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateVirementSuccess, UpdateVirementSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateVirementFailure, UpdateVirementFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return virementReducer(state, action);
}

export const featureKey = 'virement';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
