import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { AccreditationGestionnaireModel } from '@models/accreditation-gestionnaire.model';
import { CreateAccreditations, CreateAccreditationsFailure, CreateAccreditationsSuccess, DeleteAccreditations, DeleteAccreditationsFailure, DeleteAccreditationsSuccess, GetAccreditations, GetAccreditationsFailure, GetAccreditationsSuccess } from '@actions/accreditaions.actions';

@Injectable()
export class AccreditationEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAccreditations),
      mergeMap((action) =>
        this.apisService.get<AccreditationGestionnaireModel[]>('/accreditations').pipe(
          switchMap((payload) => {
            return [GetAccreditationsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetAccreditationsFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAccreditations),
      mergeMap((action) =>
        this.apisService.post<AccreditationGestionnaireModel>('/accreditations', action.payload).pipe(
          switchMap((payload) => {
            return [CreateAccreditationsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(CreateAccreditationsFailure(err)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteAccreditations),
      mergeMap((action) =>
        this.apisService.delete<any>(`/accreditations/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteAccreditationsSuccess(), GetAccreditations()];
          }),
          catchError((err: HttpErrorResponse) => of(DeleteAccreditationsFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) { }
}
