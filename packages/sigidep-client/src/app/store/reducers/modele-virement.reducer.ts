import {
  CreateModelevirement,
  CreateModeleVirementFailure,
  CreateModeleVirementSuccess,
  DeleteModelVirement,
  DeleteModelVirementFailure,
  DeleteModelVirementSuccess,
  GetModeleVirement,
  GetModeleVirementsFailure,
  GetModeleVirementsSuccess,
  UpdateModeleVirement,
  UpdateModeleVirementFailure,
  UpdateModeleVirementSuccess,
} from '@actions/model-virement.actions';
import { ModeleVirementModel } from '@models/modele-virement.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: ModeleVirementModel[];
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

const modeleVirementReducer = createReducer(
  initialState,
  on(GetModeleVirement, (state) => {
    return { ...state, loading: true };
  }),
  on(GetModeleVirementsSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetModeleVirementsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteModelVirement, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteModelVirementSuccess, DeleteModelVirementFailure, (state, { }) => {
    return { ...state, loading: false };
  }),
  on(CreateModelevirement, (state) => {
    return { ...state, loading: true };
  }),
  on(UpdateModeleVirement, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateModeleVirementSuccess, UpdateModeleVirementSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateModeleVirementFailure, UpdateModeleVirementFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return modeleVirementReducer(state, action);
}

export const featureKey = 'modeleVirement';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
