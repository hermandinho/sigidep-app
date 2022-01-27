import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { BaremeMissionModel } from '@models/bareme-mission.model';
import {
  CreateBareme,
  CreateBaremeFailure,
  CreateBaremeSuccess,
  DeleteBareme,
  DeleteBaremeFailure,
  DeleteBaremeSuccess,
  GetBaremes,
  GetBaremesFailure,
  GetBaremesSuccess,
  UpdateBareme,
  UpdateBaremeFailure,
  UpdateBaremeSuccess,
} from '@actions/baremes.actions';

@Injectable()
export class BaremesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBaremes),
      mergeMap((action) =>
        this.apisService.get<BaremeMissionModel[]>('/baremes-missions').pipe(
          switchMap((payload) => {
            return [GetBaremesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetBaremesFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateBareme),
      mergeMap((action) =>
        this.apisService
          .post<BaremeMissionModel>('/baremes-missions', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateBaremeSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) => of(CreateBaremeFailure(err)))
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateBareme),
      mergeMap((action) =>
        this.apisService
          .post<BaremeMissionModel>('/baremes-missions', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateBaremeSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) => of(UpdateBaremeFailure(err)))
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteBareme),
      mergeMap((action) =>
        this.apisService.delete<any>(`/baremes-missions/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteBaremeSuccess(), GetBaremes()];
          }),
          catchError((err: HttpErrorResponse) => of(DeleteBaremeFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
