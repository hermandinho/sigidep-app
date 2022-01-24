import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateRegimeFiscal,
  CreateRegimeFiscalFailure,
  CreateRegimeFiscalSuccess,
  GetRegimes,
  GetRegimesFailure,
  GetRegimesSuccess,
} from '@actions/regimes.actions';
import { RegimeFiscalModel } from '@models/regime-fiscal.model';

@Injectable()
export class RegimesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetRegimes),
      mergeMap((action) =>
        this.apisService.get<RegimeFiscalModel[]>('/regimes').pipe(
          switchMap((payload) => {
            return [GetRegimesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetRegimesFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateRegimeFiscal),
      mergeMap((action) =>
        this.apisService
          .post<RegimeFiscalModel>('/regimes', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateRegimeFiscalSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateRegimeFiscalFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
