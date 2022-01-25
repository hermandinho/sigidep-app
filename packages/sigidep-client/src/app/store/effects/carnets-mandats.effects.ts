import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateCarnetMandat,
  CreateCarnetMandatFailure,
  CreateCarnetMandatSuccess,
  DeleteCarnetMandat,
  DeleteCarnetMandatFailure,
  DeleteCarnetMandatSuccess,
  GetCarnetMandats,
  GetCarnetMandatsFailure,
  GetCarnetMandatsSuccess,
  UpdateCarnetMandat,
  UpdateCarnetMandatFailure,
  UpdateCarnetMandatSuccess,
} from '@actions/carnets-mandats.actions';
import { CarnetMandatModel } from '@models/carnet-mandat.model';

@Injectable()
export class CarnetsMandatsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCarnetMandats),
      mergeMap((action) =>
        this.apisService.get<CarnetMandatModel[]>('/carnets-mandats').pipe(
          switchMap((payload) => {
            return [GetCarnetMandatsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetCarnetMandatsFailure(err))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateCarnetMandat),
      mergeMap((action) =>
        this.apisService
          .post<CarnetMandatModel>('/carnets-mandats', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateCarnetMandatSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateCarnetMandatFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCarnetMandat),
      mergeMap((action) =>
        this.apisService
          .post<CarnetMandatModel>('/carnets-mandats', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateCarnetMandatSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateCarnetMandatFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteCarnetMandat),
      mergeMap((action) =>
        this.apisService.delete<any>(`/carnets-mandats/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteCarnetMandatSuccess(), GetCarnetMandats()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteCarnetMandatFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
