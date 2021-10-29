import {Action, createFeatureSelector, createReducer, createSelector, on,} from '@ngrx/store';
import {ExerciseModel} from "@models/exercise.model";
import {
  DeleteExercises, DeleteExercisesFailure,
  DeleteExercisesSuccess,
  GetExercises,
  GetExercisesFailure,
  GetExercisesSuccess
} from "@actions/exercises.actions";

export interface State {
  data: ExerciseModel[];
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

const authReducer = createReducer(
  initialState,
  on(GetExercises, (state) => {
    return { ...state, loading: true };
  }),
  on(GetExercisesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetExercisesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),

  on(DeleteExercises, (state, { ids }) => {
    return { ...state, loading: true };
  }),
  on(DeleteExercisesSuccess, DeleteExercisesFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const FeatureKey = 'exercises';

const userState = createFeatureSelector<State>(FeatureKey);

export const getLoadingSelector = createSelector(userState, (state) => state.loading);
export const getDataSelector = createSelector(userState, (state) => state.data);
