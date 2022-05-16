import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { EngagementMandatModel } from '@models/engagement-mandat.model';
import { CancelEngagementMandatsReservation, CancelEngagementMandatsReservationFailure, CancelEngagementMandatsReservationSuccess, CreateEngagementMandats, CreateEngagementMandatsFailure, CreateEngagementMandatsSuccess, DeleteEngagementMandats, DeleteEngagementMandatsFailure, DeleteEngagementMandatsSuccess, GetEngagementMandats, GetEngagementMandatsFailure, GetEngagementMandatsSuccess, UpdateEngagementMandats, UpdateEngagementMandatsFailure, UpdateEngagementMandatsSuccess } from '@actions/engagement-mandat.actions';


@Injectable()
export class EngagementsMandatsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetEngagementMandats),
      mergeMap((action) =>
        this.apisService.get<EngagementMandatModel[]>('/engagements/mandats').pipe(
          switchMap((payload) => {
            return [GetEngagementMandatsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetEngagementMandatsFailure(err))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateEngagementMandats),
      mergeMap((action) =>
        this.apisService
          .post<EngagementMandatModel>('/engagements/mandats', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateEngagementMandatsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateEngagementMandatsFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateEngagementMandats),
      mergeMap((action) =>
        this.apisService
          .post<EngagementMandatModel>('/engagements/mandats', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateEngagementMandatsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateEngagementMandatsFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteEngagementMandats),
      mergeMap((action) =>
        this.apisService.delete<any>(`/engagements/mandats/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [
              DeleteEngagementMandatsSuccess(),
              GetEngagementMandats
            ];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteEngagementMandatsFailure(err))
          )
        )
      )
    )
  );

  cancel$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CancelEngagementMandatsReservation),
    mergeMap((action) =>
      this.apisService
        .put<EngagementMandatModel>(
          `/engagements/mandats/cancel/${action.payload.id}`,
          action.payload
        )
        .pipe(
          switchMap((payload) => {
            return [
              CancelEngagementMandatsReservationSuccess({ payload }),
              GetEngagementMandats()
            ];
          }),
          catchError((err: HttpErrorResponse) =>
            of(CancelEngagementMandatsReservationFailure(err))
          )
        )
    )
  )
);




  constructor(private actions$: Actions, private apisService: ApisService) {}
}
