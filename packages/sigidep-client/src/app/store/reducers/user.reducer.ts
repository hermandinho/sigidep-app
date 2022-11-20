import { UserModel } from '../../models/user.model';
import { GetUsers, GetUsersSuccess, GetUsersFailure, CreateUsers, DeleteUsers, DeleteUsersSuccess, DeleteUsersFailure, CreateUsersSuccess, CreateUsersFailure } from '../actions/users.actions';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: UserModel[];
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

const usersReducer = createReducer(
  initialState,
  on(GetUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(GetUsersSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetUsersFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(DeleteUsers, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteUsersSuccess, DeleteUsersFailure, (state, {}) => {
    return { ...state, loading: false };
  }),

  on(CreateUsersSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateUsersFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return usersReducer(state, action);
}

export const featureKey = 'users';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
