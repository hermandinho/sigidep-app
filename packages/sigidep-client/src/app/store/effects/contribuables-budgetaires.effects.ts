import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';

import { ContribuableBugetaireModel } from '@models/contribuable-budgetaire.model';
import {
  GetContribuablesBugetaires,
  GetContribuablesBugetairesSuccess,
  GetContribuablesBugetairesFailure,
  UpdateContribuableBugetaire,
  UpdateContribuableBugetaireSuccess,
  UpdateContribuableBugetaireFailure,
  DeleteContribuableBugetaire,
  DeleteContribuableBugetaireSuccess,
  DeleteContribuableBugetaireFailure,
  CreateContribuableBugetaire,
  CreateContribuableBugetaireSuccess,
  CreateContribuableBugetaireFailure,
} from '@store/actions';

@Injectable()
export class ContribuablesBudgetairesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetContribuablesBugetaires),
      mergeMap((action) =>
        this.apisService
          .get<ContribuableBugetaireModel[]>('/contribuables-budgetaires')
          .pipe(
            switchMap((payload) => {
              return [GetContribuablesBugetairesSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetContribuablesBugetairesFailure(err))
            )
          )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateContribuableBugetaire),
      mergeMap((action) =>
        this.apisService
          .post<ContribuableBugetaireModel>(
            '/contribuables-budgetaires',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [CreateContribuableBugetaireSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateContribuableBugetaireFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateContribuableBugetaire),
      mergeMap((action) =>
        this.apisService
          .post<ContribuableBugetaireModel>(
            '/contribuables-budgetaires',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [UpdateContribuableBugetaireSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateContribuableBugetaireFailure(err))
            )
          )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteContribuableBugetaire),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/contribuables-budgetaires?ids=${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [
                DeleteContribuableBugetaireSuccess(),
                GetContribuablesBugetaires(),
              ];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteContribuableBugetaireFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
