import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { SetAppBreadcrumb } from '@store/actions';
import { MenuItem } from 'primeng/api';

export interface State {
  breadcrumb: MenuItem[];
}

export const initialState: State = {
  breadcrumb: [],
};

const authReducer = createReducer(
  initialState,
  on(SetAppBreadcrumb, (state, { breadcrumb }) => {
    return { ...state, breadcrumb };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'app';

const userState = createFeatureSelector<State>(FeatureKey);

export const getBreadcrumbSelector = createSelector(
  userState,
  (state) => state.breadcrumb
);
