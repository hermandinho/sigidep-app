import { GradeModel } from '@models/grade.model';
import { createAction, props } from '@ngrx/store';
export const GetGrades = createAction('[Grades] Filter');
export const GetGradesSuccess = createAction(
  '[Grades] Filter success',
  props<{ payload: GradeModel[] }>()
);
export const GetGradesFailure = createAction(
  '[Grades] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateGrade = createAction(
  '[Grades] Create grade',
  props<{ payload: GradeModel }>()
);
export const CreateGradeSuccess = createAction(
  '[Grades] Create grade',
  props<{ payload: GradeModel }>()
);
export const CreateGradeFailure = createAction(
  '[Grades] Create grade',
  props<{ error?: any }>()
);
