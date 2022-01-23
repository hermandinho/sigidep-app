import {
  CreateArticle,
  CreateArticleFailure,
  CreateArticlesuccess,
  DeleteArticle,
  DeleteArticleFailure,
  DeleteArticleSuccess,
  GetArticles,
  GetArticlesFailure,
  GetArticlesSuccess,
  UpdateArticle,
  UpdateArticleFailure,
  UpdateArticleSuccess,
} from '@actions/articles.actions';
import { ArticleModel } from '@models/article.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface State {
  data: ArticleModel[];
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

const articlesReducer = createReducer(
  initialState,
  on(GetArticles, (state) => {
    return { ...state, loading: true };
  }),
  on(GetArticlesSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: payload };
  }),
  on(GetArticlesFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(DeleteArticle, (state, { id }) => {
    return { ...state, loading: true };
  }),
  on(DeleteArticleSuccess, DeleteArticleFailure, (state, {}) => {
    return { ...state, loading: false };
  }),
  on(CreateArticle, (state) => {
    return { ...state, loading: true };
  }),
  on(UpdateArticle, (state) => {
    return { ...state, loading: true };
  }),
  on(CreateArticlesuccess, UpdateArticleSuccess, (state, { payload }) => {
    return { ...state, loading: false, data: [payload] };
  }),
  on(CreateArticleFailure, UpdateArticleFailure, (state, { error }) => {
    return { ...state, loading: false, error: error };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return articlesReducer(state, action);
}

export const featureKey = 'articles';

const userState = createFeatureSelector<State>(featureKey);

export const getLoadingSelector = createSelector(
  userState,
  (state) => state.loading
);
export const getDataSelector = createSelector(userState, (state) => state.data);
