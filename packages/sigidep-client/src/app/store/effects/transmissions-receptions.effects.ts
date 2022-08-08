import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { TransmissionsReceptionModel } from '@models/transmission-reception.model';
import { CreateTransmissionsReception, CreateTransmissionsReceptionFailure, CreateTransmissionsReceptionSuccess, GetTransmissionsReceptions, GetTransmissionsReceptionsFailure, GetTransmissionsReceptionsSuccess} from '@actions/transmissions-receptions.actions';
import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';

@Injectable()
export class TransmissionsReceptionsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetTransmissionsReceptions),
      mergeMap((action) =>
        this.apisService.get<TransmissionsReceptionModel[]>('/transmissions-receptions', {
          ...(action.exercices && {
            exercices: action.exercices.join(','),
          })}).pipe(
          switchMap((payload) => {
            return [GetTransmissionsReceptionsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetTransmissionsReceptionsFailure(err))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateTransmissionsReception),
      mergeMap((action) =>
        this.apisService
          .post<TransmissionsReceptionModel>('/transmissions-receptions', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateTransmissionsReceptionSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateTransmissionsReceptionFailure(err))
            )
          )
      )
    )
  );

  cancel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateTransmissionsReception),
      mergeMap((action) =>
        this.apisService
          .put<TransmissionsReceptionModel>(
            `/transmissions-receptions/cancel/${action.payload.id}`,
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              console.log(action);

              return [
                CreateTransmissionsReceptionSuccess({ payload }),
                GetTransmissionsReceptions({}),
                GetTransmissionsReceptionsDetails({})
              ];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateTransmissionsReceptionFailure(err))
            )
          )
      )
    )
  );


  constructor(private actions$: Actions, private apisService: ApisService) { }
}
