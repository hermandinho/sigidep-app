import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { EncoursModel } from '@models/encours.model';
import { GetEncours, GetEncoursFailure, GetEncoursSuccess } from '@actions/encours.actions';
import { GetImputations, GetImputationsFailure, GetImputationsSuccess } from '@actions/imputations.actions';


@Injectable()
export class ImputationsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetImputations),
      mergeMap((action) =>
        this.apisService.get<EncoursModel[]>(`/encours/imputations/code?imputation=${action.imputation}`).pipe(
          switchMap((payload) => {
            return [GetImputationsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetImputationsFailure(err)))
        )
      )
    )
  );





  constructor(private actions$: Actions, private apisService: ApisService) {}
}
