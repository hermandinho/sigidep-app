import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';

import {
  CreateEngagementCommande,
  CreateEngagementCommandeFailure,
  CreateEngagementCommandesuccess,
  DeleteEngagementCommande,
  DeleteEngagementCommandeFailure,
  DeleteEngagementCommandeSuccess,
  GetEngagementCommandes,
  GetEngagementCommandesFailure,
  GetEngagementCommandesSuccess,
  UpdateEngagementCommande,
  UpdateEngagementCommandeFailure,
  UpdateEngagementCommandeSuccess,
} from '@actions/engagement-commande.actions';
import { EngagementCommandeModel } from '@models/engagement-commande.model';

@Injectable()
export class EngagementsCommandesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetEngagementCommandes),
      mergeMap((action) =>
        this.apisService
          .get<EngagementCommandeModel[]>('/engagements/commandes')
          .pipe(
            switchMap((payload) => {
              return [GetEngagementCommandesSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetEngagementCommandesFailure(err))
            )
          )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateEngagementCommande),
      mergeMap((action) =>
        this.apisService
          .post<EngagementCommandeModel>(
            '/engagements/commandes',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [CreateEngagementCommandesuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateEngagementCommandeFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateEngagementCommande),
      mergeMap((action) =>
        this.apisService
          .post<EngagementCommandeModel>(
            '/engagements/commandes',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [UpdateEngagementCommandeSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateEngagementCommandeFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteEngagementCommande),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/engagements/commandes/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [
                DeleteEngagementCommandeSuccess(),
                GetEngagementCommandes(),
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
