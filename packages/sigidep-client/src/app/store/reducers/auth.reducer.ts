import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {UserModel} from "@models/user.model";
import {GetCurrentAuthSuccess, Login, LoginFailure, LoginSuccess} from "@actions/auth.actions";

export interface State {
  user: UserModel | undefined;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  user: undefined,
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
  on(Login, (state) => {
    return { ...state, loading: true };
  }),
  on(LoginSuccess, (state, { payload }) => {
    return { ...state, loading: false };
  }),
  on(LoginFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(GetCurrentAuthSuccess, (state, { user }) => {
    return { ...state, loading: false, user };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const AuthFeatureKey = 'auth';

const userState = createFeatureSelector<State>(AuthFeatureKey);

export const getAuthLoading = createSelector(
  userState,
  (state) => state.loading
);

export const getAuthError = createSelector(userState, (state) => state.error);
export const getAuthUserSelector = createSelector(userState, (state) => state.user);
