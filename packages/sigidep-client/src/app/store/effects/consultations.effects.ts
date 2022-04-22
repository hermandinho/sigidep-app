import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import {
    GetCertificatEngagementsFailure,
    GetCertificatEngagementsSuccess,
    GetCertificatEngagements
} from '../actions/consultations.actions';
import { ApisService } from '@services/apis.service';
import { EncoursModel } from '@models/encours.model';
import { GetEncours, GetEncoursFailure, GetEncoursSuccess } from '@actions/encours.actions';
import { GetImputations, GetImputationsFailure, GetImputationsSuccess } from '@actions/consultations.actions';


@Injectable()
export class ConsultationsEffects {
  certificat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCertificatEngagements),
      mergeMap((action) =>
        this.apisService.get<EncoursModel[]>(`/encours/imputations/code?imputation=${action.engagement}`).pipe(
          switchMap((payload) => {
            return [GetCertificatEngagementsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetCertificatEngagementsFailure(err)))
        )
      )
    )
  );

  imputation$ = createEffect(() =>
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
