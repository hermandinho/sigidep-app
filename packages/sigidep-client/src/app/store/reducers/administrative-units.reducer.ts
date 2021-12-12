import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  GetAdministrativeUnites,
  GetAdministrativeUnitesFailure,
  GetAdministrativeUnitesSuccess,
  GetFunctions,
  GetFunctionsSuccess,
} from '@store/actions';
import {
  AdministrativeUnitModel,
  FunctionModel,
} from '@models/administrative-unit.model';

export interface State {
  data: AdministrativeUnitModel[];
  functions: FunctionModel[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: [],
  functions: [],
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
  on(GetAdministrativeUnites, (state) => {
    return { ...state, loading: true };
  }),
  on(GetAdministrativeUnitesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetAdministrativeUnitesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(GetFunctionsSuccess, (state, { payload }) => {
    return { ...state, functions: payload };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'administrativeUnits';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
export const getFunctionsDataSelector = createSelector(
  userState,
  (state) => state.functions
);
