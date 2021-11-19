import { createAction, props } from '@ngrx/store';
import { SubProgramModel } from '@models/sub-program.model';

export const GetSubPrograms = createAction('[Sub Program] Get sub program');
export const GetSubProgramsSuccess = createAction(
  '[Sub Program] Get sub program success',
  props<{ payload: SubProgramModel[] }>()
);
export const GetSubProgramsFailure = createAction(
  '[Sub Program] Get sub program success',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateSubProgram = createAction(
  '[Sub Program] Create sub program',
  props<{ payload: any }>()
);
export const CreateSubProgramSuccess = createAction(
  '[Sub Program] Create sub program success',
  props<{ payload: SubProgramModel }>()
);
export const CreateSubProgramFailure = createAction(
  '[Sub Program] Create sub program failure',
  props<{ error?: any }>()
);
