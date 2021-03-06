import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateCategorieAgent,
  CreateCategorieAgentFailure,
  CreateCategorieAgentSuccess,
  DeleteCategorieAgent,
  DeleteCategorieAgentFailure,
  DeleteCategorieAgentSuccess,
  GetCategoriesAgents,
  GetCategoriesAgentsFailure,
  GetCategoriesAgentsSuccess,
  UpdateCategorieAgent,
  UpdateCategorieAgentFailure,
  UpdateCategorieAgentSuccess,
} from '@actions/categorie-agent.actions';
import { CategorieAgentModel } from '@models/categorie-agent.model';

@Injectable()
export class CategoriesAgntsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCategoriesAgents),
      mergeMap((action) =>
        this.apisService.get<CategorieAgentModel[]>('/categories-agents').pipe(
          switchMap((payload) => {
            return [GetCategoriesAgentsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetCategoriesAgentsFailure(err))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateCategorieAgent),
      mergeMap((action) =>
        this.apisService
          .post<CategorieAgentModel>('/categories-agents', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateCategorieAgentSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateCategorieAgentFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCategorieAgent),
      mergeMap((action) =>
        this.apisService
          .post<CategorieAgentModel>('/categories-agents', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateCategorieAgentSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateCategorieAgentFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteCategorieAgent),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/categories-agents/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [DeleteCategorieAgentSuccess(), GetCategoriesAgents()];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteCategorieAgentFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
