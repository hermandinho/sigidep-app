import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { PermissionModel, RoleModel } from '@models/role.model';
import { GetRoles, GetRolesFailure, GetRolesSuccess } from '@store/actions';

export interface State {
  data: RoleModel[];
  permissions: PermissionModel[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: [],
  permissions: [],
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
  on(GetRoles, (state) => {
    return { ...state, loading: true };
  }),
  on(GetRolesSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      data: payload.roles,
      permissions: payload.permissions,
    };
  }),
  on(GetRolesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'roles';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
export const getPermissionsSelector = createSelector(
  userState,
  (state) => state.permissions
);
