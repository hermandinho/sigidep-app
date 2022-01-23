import {
  CreateGrade,
  CreateGradeSuccess,
  GetGrades,
  GetGradesFailure,
  GetGradesSuccess,
} from '@actions/grades.actions';
import { GradeModel } from '@models/grade.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: GradeModel[];
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

const gradesReducer = createReducer(
  initialState,
  on(GetGrades, (state) => {
    return { ...state, loading: true };
  }),
  on(GetGradesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetGradesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(CreateGrade, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateGradeSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return gradesReducer(state, action);
}

export const featureKey = 'grades';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
