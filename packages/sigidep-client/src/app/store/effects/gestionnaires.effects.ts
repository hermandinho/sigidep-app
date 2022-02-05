import { GestionnaireModel } from './../../models/gestionnaire.model';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';

import {
  GetGestionnaires,
  GetGestionnairesSuccess,
  GetGestionnairesFailure,
  UpdateGestionnaire,
  UpdateGestionnaireSuccess,
  UpdateGestionnaireFailure,
  DeleteGestionnaire,
  DeleteGestionnaireSuccess,
  DeleteGestionnaireFailure,
  CreateGestionnaire,
  CreateGestionnaireSuccess,
  CreateGestionnaireFailure,
} from '@store/actions';

@Injectable()
export class GestionnairesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetGestionnaires),
      mergeMap((action) =>
        this.apisService.get<GestionnaireModel[]>('/gestionnaires').pipe(
          switchMap((payload) => {
            return [GetGestionnairesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetGestionnairesFailure(err))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateGestionnaire),
      mergeMap((action) =>
        this.apisService
          .post<GestionnaireModel>('/gestionnaires', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateGestionnaireSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateGestionnaireFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateGestionnaire),
      mergeMap((action) =>
        this.apisService
          .post<GestionnaireModel>('/gestionnaires', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateGestionnaireSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateGestionnaireFailure(err))
            )
          )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteGestionnaire),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/gestionnaires?ids=${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [DeleteGestionnaireSuccess(), GetGestionnaires()];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteGestionnaireFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
