import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetStructure,
  GetStructureSuccess,
  SetAppBreadcrumb,
} from '@store/actions';
import { MenuItem } from 'primeng/api';
import { StructureModel } from '@models/structure.model';

export interface State {
  breadcrumb: MenuItem[];
  structure: StructureModel | undefined;
}

export const initialState: State = {
  breadcrumb: [],
  structure: undefined,
};

const authReducer = createReducer(
  initialState,
  on(SetAppBreadcrumb, (state, { breadcrumb }) => {
    return { ...state, breadcrumb };
  }),
  on(GetStructureSuccess, (state, { payload }) => {
    return { ...state, structure: payload };
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

export const getStructureSelector = createSelector(
  userState,
  (state) => state.structure
);
