import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateSousRubrique,
  CreateSousRubriqueFailure,
  CreateSousRubriqueSuccess,
  DeleteSousRubrique,
  DeleteSousRubriqueFailure,
  DeleteSousRubriquesuccess,
  GetSousRubriques,
  GetSousRubriquesFailure,
  GetSousRubriquesSuccess,
  UpdateSousRubrique,
  UpdateSousRubriqueFailure,
  UpdateSousRubriqueSuccess,
} from '@actions/sous-rubriques.actions';
import { SousRubriqueModel } from '@models/sous-rubrique.model';

@Injectable()
export class SousRubriquesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetSousRubriques),
      mergeMap((action) =>
        this.apisService
          .get<SousRubriqueModel[]>('/mercuriales/sous-rubriques')
          .pipe(
            switchMap((payload) => {
              return [GetSousRubriquesSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetSousRubriquesFailure(err))
            )
          )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateSousRubrique),
      mergeMap((action) =>
        this.apisService
          .post<SousRubriqueModel>(
            '/mercuriales/sous-rubriques',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [CreateSousRubriqueSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateSousRubriqueFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateSousRubrique),
      mergeMap((action) =>
        this.apisService
          .post<SousRubriqueModel>(
            '/mercuriales/sous-rubriques',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [UpdateSousRubriqueSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateSousRubriqueFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteSousRubrique),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/mercuriales/sous-rubriques/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [DeleteSousRubriquesuccess(), GetSousRubriques()];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteSousRubriqueFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
