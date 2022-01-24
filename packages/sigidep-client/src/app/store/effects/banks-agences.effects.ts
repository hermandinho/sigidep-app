import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  GetBanks,
  GetBanksSuccess,
  GetBanksFailure,
  DeleteBanks,
  DeleteBanksSuccess,
  DeleteBanksFailure,
  DeleteAgenges,
  DeleteAgengesSuccess,
  DeleteAgengesFailure,
} from '@store/actions';
import { BankModel } from '@models/index';

@Injectable()
export class BanksAgencesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBanks),
      mergeMap((action) =>
        this.apisService.get<BankModel[]>('/banks').pipe(
          switchMap((payload) => {
            return [GetBanksSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetBanksFailure(err)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteBanks),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/banks`, { ids: action.ids?.join(',') })
          .pipe(
            switchMap((payload) => {
              return [DeleteBanksSuccess({ ids: action.ids }), GetBanks()];
            }),
            catchError((err: HttpErrorResponse) => of(DeleteBanksFailure(err)))
          )
      )
    )
  );

  deleteAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteAgenges),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/agences`, { ids: action.ids?.join(',') })
          .pipe(
            switchMap((payload) => {
              return [DeleteAgengesSuccess({ ids: action.ids }), GetBanks()];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteAgengesFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
