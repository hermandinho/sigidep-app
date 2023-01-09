import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { BonEngagementModel } from '@models/bon-engagement.model';
import {
  CancelBonsEngagementsReservation,
  CancelBonsEngagementsReservationFailure,
  CancelBonsEngagementsReservationSuccess,
  CreateBonsEngagements,
  CreateBonsEngagementsFailure,
  CreateBonsEngagementsSuccess,
  DeleteBonsEngagements,
  DeleteBonsEngagementsFailure,
  DeleteBonsEngagementsSuccess,
  GetBonsEngagements,
  GetBonsEngagementsFailure,
  GetBonsEngagementsSuccess,
  GetFactureArticles,
  GetFactureArticlesFailure,
  GetFactureArticlesSuccess,
  UpdateBonsEngagements,
  UpdateBonsEngagementsFailure,
  UpdateBonsEngagementsSuccess,
} from '@actions/bons-engagements.actions';
import { FactureArticleModel } from '@models/facture-article.model';
import { CertificationBons, CertificationBonsSuccess, CertificationBonsFailure } from '../actions/bons-engagements.actions';

@Injectable()
export class BonsEngagementsEffects {
  action!:BonEngagementModel;
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBonsEngagements),
      mergeMap((action) =>
        this.apisService
          .get<BonEngagementModel[]>('/bons-engagements', {
            ...(action.procedures && {
              procedures: action.procedures.join(','),
            }),
            ...(action.etats && {
              etats: action.etats.join(','),
            }),
            ...(action.numeros && {
              numeros: action.numeros.join(','),
            }),
            ...(action.imputation && {
              imputation: action.imputation.join(','),
            }),
          })
          .pipe(
            switchMap((payload) => {
              return [GetBonsEngagementsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetBonsEngagementsFailure(err))
            )
          )
      )
    )
  );

  fetchFactureArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetFactureArticles),
      mergeMap((action) =>
        this.apisService
          .get<FactureArticleModel[]>(
            `/bons-engagements/facture/${action.factureId}/articles`
          )
          .pipe(
            switchMap((payload) => {
              return [GetFactureArticlesSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetFactureArticlesFailure(err))
            )
          )
      )
    )
  );
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateBonsEngagements),
      mergeMap((action) =>
        this.apisService
          .post<BonEngagementModel>('/bons-engagements', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateBonsEngagementsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateBonsEngagementsFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateBonsEngagements),
      mergeMap((action) =>
        this.apisService
          .post<BonEngagementModel>('/bons-engagements', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateBonsEngagementsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateBonsEngagementsFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteBonsEngagements),
      mergeMap((action) =>
        this.apisService.delete<any>(`/bons-engagements/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteBonsEngagementsSuccess()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteBonsEngagementsFailure(err))
          )
        )
      )
    )
  );

  cancel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CancelBonsEngagementsReservation),
      mergeMap((action) =>
        this.apisService
          .put<BonEngagementModel>(
            `/bons-engagements/cancel/${action.payload.id}`,
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              console.log(action.payload);
              //this.action = action.payload;
              return [CancelBonsEngagementsReservationSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CancelBonsEngagementsReservationFailure(err))
            )
          )
      )
    )
  );

  certification$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CertificationBons),
    mergeMap((action) =>
      this.apisService
        .put<BonEngagementModel>(
          `/bons-engagements/certificat/${action.payload.id}`,
          action.payload
        )
        .pipe(
          switchMap((payload) => {
            console.log(action);

            return [CertificationBonsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(CertificationBonsFailure(err))
          )
        )
    )
  )
);

  constructor(private actions$: Actions, private apisService: ApisService) { }
}
