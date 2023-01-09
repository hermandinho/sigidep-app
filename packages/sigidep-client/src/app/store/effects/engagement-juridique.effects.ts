import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';

import {
  CancelEngagementReservation,
  CancelEngagementReservationFailure,
  CancelEngagementReservationSuccess,
  CreateEngagementJuridique,
  CreateEngagementJuridiqueFailure,
  CreateEngagementJuridiqueSuccess,
  DeleteEngagement,
  DeleteEngagementFailure,
  DeleteEngagementSuccess,
  GetEngagementJuridiques,
  GetEngagementJuridiquesFailure,
  GetEngagementJuridiquesSuccess,
  UpdateEngagement,
  UpdateEngagementFailure,
  UpdateEngagementSuccess,
} from '@actions/engagement-juridique.actions';
import { EngagementJuridiqueModel } from '@models/engagement-juridique.model';
import { GetEngagementCommandes } from '@actions/engagement-commande.actions';
import { GetEngagementMissions } from '@actions/engagement-mission.actions';
import { GetEngagementDecisions } from '@actions/engagement-decision.actions';
import { CategorieProcedure } from 'app/utils/types';

@Injectable()
export class EngagementsJuridiquesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetEngagementJuridiques),
      mergeMap((action) =>
        this.apisService
          .get<EngagementJuridiqueModel[]>('/engagements', {
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
              imputation: action.imputation,
            }),
          })
          .pipe(
            switchMap((payload) => {
              return [GetEngagementJuridiquesSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetEngagementJuridiquesFailure(err))
            )
          )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateEngagementJuridique),
      mergeMap((action) =>
        this.apisService
          .post<EngagementJuridiqueModel>('/engagements', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateEngagementJuridiqueSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateEngagementJuridiqueFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateEngagement),
      mergeMap((action) =>
        this.apisService
          .post<EngagementJuridiqueModel>('/engagements', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateEngagementSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateEngagementFailure(err))
            )
          )
      )
    )
  );

  cancel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CancelEngagementReservation),
      mergeMap((action) =>
        this.apisService
          .put<EngagementJuridiqueModel>(
            `/engagements/cancel/${action.payload.id}`,
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [
                CancelEngagementReservationSuccess({ payload }),
                new EngagementJuridiqueModel(payload).isCommand
                  ? GetEngagementCommandes({})
                  : new EngagementJuridiqueModel(payload).isMission
                  ? GetEngagementMissions({})
                  : GetEngagementDecisions({}),
              ];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CancelEngagementReservationFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteEngagement),
      mergeMap((action) =>
        this.apisService.delete<any>(`/engagements/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [
              DeleteEngagementSuccess(),
              GetEngagementCommandes({}),
              GetEngagementMissions({}),
              GetEngagementDecisions({}),
            ];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteEngagementFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
