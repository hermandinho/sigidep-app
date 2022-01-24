import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
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

@Injectable()
export class ArticlesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetArticles),
      mergeMap((action) =>
        this.apisService.get<ArticleModel[]>('/mercuriales/articles').pipe(
          switchMap((payload) => {
            return [GetArticlesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetArticlesFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateArticle),
      mergeMap((action) =>
        this.apisService
          .post<ArticleModel>('/mercuriales/articles', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateArticlesuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateArticleFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateArticle),
      mergeMap((action) =>
        this.apisService
          .post<ArticleModel>('/mercuriales/articles', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateArticleSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateArticleFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteArticle),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/mercuriales/articles/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [DeleteArticleSuccess(), GetArticles()];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteArticleFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
