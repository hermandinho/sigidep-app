import {
  CreateGrade,
  CreateGradeFailure,
  CreateGradeSuccess,
  DeleteGrade,
  DeleteGradeFailure,
  DeleteGradeSuccess,
  GetGrades,
  GetGradesFailure,
  GetGradesSuccess,
  UpdateGrade,
  UpdateGradeFailure,
  UpdateGradeSuccess,
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
  on(DeleteGrade, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteGradeSuccess, DeleteGradeFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(UpdateGrade, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateGradeSuccess, UpdateGradeSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateGradeFailure, UpdateGradeFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
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
