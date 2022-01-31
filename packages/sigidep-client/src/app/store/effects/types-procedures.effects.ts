import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateTypeProcedure,
  CreateTypeProcedureFailure,
  CreateTypeProcedureSuccess,
  DeleteTypeProcedure,
  DeleteTypeProcedureFailure,
  DeleteTypeProcedureSuccess,
  GetTypesProcedures,
  GetTypesProceduresFailure,
  GetTypesProceduresSuccess,
  UpdateTypeProcedure,
  UpdateTypeProcedureFailure,
  UpdateTypeProcedureSuccess,
} from '@actions/types-procedures.actions';
import { TypeProcedureModel } from '@models/type-procedure.model';

@Injectable()
export class TypesProceduresEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetTypesProcedures),
      mergeMap((action) =>
        this.apisService.get<TypeProcedureModel[]>('/types-procedures').pipe(
          switchMap((payload) => {
            return [GetTypesProceduresSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetTypesProceduresFailure(err))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateTypeProcedure),
      mergeMap((action) =>
        this.apisService
          .post<TypeProcedureModel>('/types-procedures', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateTypeProcedureSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateTypeProcedureFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateTypeProcedure),
      mergeMap((action) =>
        this.apisService
          .post<TypeProcedureModel>('/types-procedures', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateTypeProcedureSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateTypeProcedureFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteTypeProcedure),
      mergeMap((action) =>
        this.apisService.delete<any>(`/types-procedures/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteTypeProcedureSuccess(), GetTypesProcedures()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteTypeProcedureFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
