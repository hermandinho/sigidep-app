import { PieceJointeModel } from '@models/piece-jointe.model';
import { createAction, props } from '@ngrx/store';
export const GetPiecesJointes = createAction('[PiecesJointes] Filter');
export const GetPiecesJointesSuccess = createAction(
  '[PiecesJointes] Filter success',
  props<{ payload: PieceJointeModel[] }>()
);
export const GetPiecesJointesFailure = createAction(
  '[PiecesJointes] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreatePieceJointe = createAction(
  '[PiecesJointes] Create piece jointe',
  props<{ payload: PieceJointeModel }>()
);
export const CreatePieceJointeSuccess = createAction(
  '[PiecesJointes] Create piece jointe',
  props<{ payload: PieceJointeModel }>()
);
export const CreatePieceJointeFailure = createAction(
  '[PiecesJointes] Create piece jointe',
  props<{ error?: any }>()
);

export const UpdatePieceJointe = createAction(
  '[PiecesJointes] Update',
  props<{ payload: PieceJointeModel }>()
);
export const UpdatePieceJointeSuccess = createAction(
  '[PiecesJointes] Update success',
  props<{ payload: PieceJointeModel }>()
);
export const UpdatePieceJointeFailure = createAction(
  '[PiecesJointes] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeletePieceJointe = createAction(
  '[PiecesJointes] Delete',
  props<{ id: number }>()
);
export const DeletePieceJointeSuccess = createAction(
  '[PiecesJointes] Delete success'
);
export const DeletePieceJointeFailure = createAction(
  '[PiecesJointes] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
