import { createAction, props } from '@ngrx/store';
import { StructureModel } from '@models/structure.model';

export const GetStructure = createAction('[Structure] Get structure');
export const GetStructureSuccess = createAction(
  '[Structure] Get structure success',
  props<{ payload: StructureModel }>()
);
export const GetStructureFailure = createAction(
  '[Structure] Get structure success',
  props<{ error?: any }>() // TODO defile errors global model here
);
