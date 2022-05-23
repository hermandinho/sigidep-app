import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';

import {
  DeleteEngagementCommandeFailure,
  DeleteEngagementCommandeSuccess,
} from '@actions/engagement-commande.actions';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import {
  CreateEngagementDecision,
  CreateEngagementDecisionFailure,
  CreateEngagementDecisionsuccess,
  DeleteEngagementDecision,
  GetEngagementDecisions,
  GetEngagementDecisionsFailure,
  GetEngagementDecisionsSuccess,
  UpdateEngagementDecision,
  UpdateEngagementDecisionFailure,
  UpdateEngagementDecisionSuccess,
} from '@actions/engagement-decision.actions';
@Injectable()
export class EngagementsDecisionsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetEngagementDecisions),
      mergeMap((action) =>
        this.apisService
          .get<EngagementDecisionModel[]>('/engagements/decisions', {
            ...(action.procedures && {
              procedures: action.procedures.join(','),
            }),
            ...(action.etats && {
              etats: action.etats.join(','),
            }),
          })
          .pipe(
            switchMap((payload) => {
              return [GetEngagementDecisionsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetEngagementDecisionsFailure(err))
            )
          )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateEngagementDecision),
      mergeMap((action) =>
        this.apisService
          .post<EngagementDecisionModel>(
            '/engagements/decisions',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [CreateEngagementDecisionsuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateEngagementDecisionFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateEngagementDecision),
      mergeMap((action) =>
        this.apisService
          .post<EngagementDecisionModel>(
            '/engagements/decisions',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [UpdateEngagementDecisionSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateEngagementDecisionFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteEngagementDecision),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/engagements/decisions/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [
                DeleteEngagementCommandeSuccess(),
                GetEngagementDecisions({}),
              ];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteEngagementCommandeFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
