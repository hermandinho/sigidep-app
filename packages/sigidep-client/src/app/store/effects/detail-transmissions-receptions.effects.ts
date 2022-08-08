import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { GetTransmissionsReceptionsDetails, GetTransmissionsReceptionsDetailsFailure, GetTransmissionsReceptionsDetailsSuccess } from '@actions/detail-transmissions-receptions.actions';

@Injectable()
export class TransmissionsReceptionsDetailsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetTransmissionsReceptionsDetails),
      mergeMap((action) =>
        this.apisService.get<any[]>('/transmissions-receptions-details', {
          ...(action.ids && {
            ids: action.ids.join(','),
          }),
          ...(action.exercices && {
            exercices: action.exercices.join(','),
          })
        }).pipe(
          switchMap((payload) => {
            console.log('payload ',payload)
            return [GetTransmissionsReceptionsDetailsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetTransmissionsReceptionsDetailsFailure(err))
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private apisService: ApisService) { }
}
