import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateEncours,
  CreateEncoursFailure,
  CreateEncoursSuccess,
  DeleteEncours,
  DeleteEncoursFailure,
  DeleteEncoursSuccess,
  GetEncours,
  GetEncoursFailure,
  GetEncoursSuccess,
} from '@actions/encours.actions';
import { EncoursModel } from '@models/encours.model';

@Injectable()
export class EncoursEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetEncours),
      mergeMap((action) =>
        this.apisService.get<EncoursModel[]>('/encours').pipe(
          switchMap((payload) => {
            return [GetEncoursSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetEncoursFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateEncours),
      mergeMap((action) =>
        this.apisService.post<EncoursModel>('/encours', action.payload).pipe(
          switchMap((payload) => {
            return [CreateEncoursSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(CreateEncoursFailure(err)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteEncours),
      mergeMap((action) =>
        this.apisService.delete<any>(`/encours/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteEncoursSuccess(), GetEncours()];
          }),
          catchError((err: HttpErrorResponse) => of(DeleteEncoursFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
