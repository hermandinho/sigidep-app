import {createAction, props} from '@ngrx/store';
import {ExerciseModel} from "@models/exercise.model";

export const GetExercises = createAction(
    '[Exercises] Filter',
  props<{ status?: 'hidden' | 'preparing' | 'active' | 'archived'}>(),
);
export const GetExercisesSuccess = createAction(
    '[Exercises] Filter success',
    props<{ payload: ExerciseModel[] }>(),
);
export const GetExercisesFailure = createAction(
    '[Exercises] Filter success',
    props<{ error?: any }>(), // TODO defile errors global model here
);
