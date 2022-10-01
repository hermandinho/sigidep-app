import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { BonEngagementModel } from '@models/bon-engagement.model';
import { GetTransmissionsReceptionsBons, GetTransmissionsReceptionsBonsSuccess, GetTransmissionsReceptionsBonsFailure } from '../actions/transmission-reception-bons.actions';

@Injectable()
export class TransmissionReceptionBonsEffects {

  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetTransmissionsReceptionsBons),
      mergeMap((action) =>
        this.apisService.get<BonEngagementModel[]>('/transmissions-receptions/bon', {
          ...(action.exercices && {
            exercices: action.exercices.join(','),
          }),
          ...(action.etats && {
            etats: action.etats.join(','),
          })
        }).pipe(
          switchMap((payload) => {
            return [GetTransmissionsReceptionsBonsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetTransmissionsReceptionsBonsFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) { }
}
