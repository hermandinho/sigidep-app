import { createAction, props } from '@ngrx/store';
import { ParagraphModel } from '@models/index';

export const GetParagraphs = createAction('[Paragraphs] Filter');
export const GetParagraphsSuccess = createAction(
  '[Paragraphs] Filter success',
  props<{ payload: ParagraphModel[] }>()
);
export const GetParagraphsFailure = createAction(
  '[Paragraphs] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateParagraph = createAction(
  '[Paragraphs] Update',
  props<{ id: number }>()
);
export const UpdateParagraphSuccess = createAction(
  '[Paragraphs] Update success'
);
export const UpdateParagraphFailure = createAction(
  '[Paragraphs] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteParagraph = createAction(
  '[Paragraphs] Delete',
  props<{ id: number }>()
);
export const DeleteParagraphSuccess = createAction(
  '[Paragraphs] Delete success'
);
export const DeleteParagraphFailure = createAction(
  '[Paragraphs] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
