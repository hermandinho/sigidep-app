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

export const UpdateGrade = createAction(
  '[Grades] Update',
  props<{ payload: GradeModel }>()
);
export const UpdateGradeSuccess = createAction(
  '[Grades] Update success',
  props<{ payload: GradeModel }>()
);
export const UpdateGradeFailure = createAction(
  '[Grades] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteGrade = createAction(
  '[Grades] Delete',
  props<{ id: number }>()
);
export const DeleteGradeSuccess = createAction('[Grades] Delete success');
export const DeleteGradeFailure = createAction(
  '[Grades] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
