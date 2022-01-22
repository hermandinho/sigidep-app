import { createAction, props } from '@ngrx/store';
import { ArticleModel } from '@models/article.model';

export const GetArticles = createAction('[articles] Filter');
export const GetArticlesSuccess = createAction(
  '[articles] Filter success',
  props<{ payload: ArticleModel[] }>()
);
export const GetArticlesFailure = createAction(
  '[articles] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
//mercuriales / articles;
export const UpdateArticle = createAction(
  '[articles] Update',
  props<{ payload: ArticleModel }>()
);
export const UpdateArticleSuccess = createAction(
  '[articles] Update success',
  props<{ payload: ArticleModel }>()
);
export const UpdateArticleFailure = createAction(
  '[articles] Update failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteArticle = createAction(
  '[articles] Delete',
  props<{ id: number }>()
);
export const DeleteArticleSuccess = createAction('[articles] Delete success');
export const DeleteArticleFailure = createAction(
  '[articles] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateArticle = createAction(
  '[articles] Create article',
  props<{ payload: ArticleModel }>()
);
export const CreateArticlesuccess = createAction(
  '[articles] Create article',
  props<{ payload: ArticleModel }>()
);
export const CreateArticleFailure = createAction(
  '[articles] Create article',
  props<{ error?: any }>()
);
