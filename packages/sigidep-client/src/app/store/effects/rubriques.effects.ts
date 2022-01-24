import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateRubrique,
  CreateRubriqueFailure,
  CreateRubriqueSuccess,
  DeleteRubrique,
  DeleteRubriqueFailure,
  DeleteRubriquesuccess,
  GetRubriques,
  GetRubriquesFailure,
  GetRubriquesSuccess,
  UpdateRubrique,
  UpdateRubriqueFailure,
  UpdateRubriquesuccess,
} from '@actions/rubriques.actions';
import { RubriqueModel } from '@models/rubrique.model';

@Injectable()
export class RubriquesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetRubriques),
      mergeMap((action) =>
        this.apisService.get<RubriqueModel[]>('/mercuriales/rubriques').pipe(
          switchMap((payload) => {
            return [GetRubriquesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetRubriquesFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateRubrique),
      mergeMap((action) =>
        this.apisService
          .post<RubriqueModel>('/mercuriales/rubriques', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateRubriqueSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateRubriqueFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateRubrique),
      mergeMap((action) =>
        this.apisService
          .post<RubriqueModel>('/mercuriales/rubriques', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateRubriquesuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateRubriqueFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteRubrique),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/mercuriales/rubriques/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [DeleteRubriquesuccess(), GetRubriques()];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteRubriqueFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
