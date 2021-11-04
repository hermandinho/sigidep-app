import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  DeleteFinancialSource,
  DeleteFinancialSourceFailure,
  DeleteFinancialSourceSuccess,
  GetFinancialSources,
  GetFinancialSourcesFailure,
  GetFinancialSourcesSuccess,
} from '@store/actions';
import { FinancialSourceModel } from '@models/financial-source.model';

@Injectable()
export class FinancialSourcesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetFinancialSources),
      mergeMap((action) =>
        this.apisService.get<FinancialSourceModel[]>('/financial-sources').pipe(
          switchMap((payload) => {
            return [GetFinancialSourcesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetFinancialSourcesFailure(err))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteFinancialSource),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/financial-sources/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [DeleteFinancialSourceSuccess(), GetFinancialSources()];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteFinancialSourceFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
