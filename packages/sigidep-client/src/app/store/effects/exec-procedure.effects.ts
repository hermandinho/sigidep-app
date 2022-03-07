import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateProcedure,
  CreateProcedureFailure,
  CreateProcedureSuccess,
  DeleteProcedure,
  DeleteProcedureFailure,
  DeleteProcedureSuccess,
  GetProcedures,
  GetProceduresFailure,
  GetProceduresSuccess,
  UpdateProcedure,
  UpdateProcedureFailure,
  UpdateProcedureSuccess,
} from '@actions/exec-procedure.actions';
import { ExecProcedureModel } from '@models/exec-procedure.model';

@Injectable()
export class ProceduresEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetProcedures),
      mergeMap((action) =>
        this.apisService.get<ExecProcedureModel[]>('/procedures').pipe(
          switchMap((payload) => {
            return [GetProceduresSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetProceduresFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateProcedure),
      mergeMap((action) =>
        this.apisService
          .post<ExecProcedureModel>('/procedures', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateProcedureSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateProcedureFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateProcedure),
      mergeMap((action) =>
        this.apisService
          .post<ExecProcedureModel>('/procedures', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateProcedureSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateProcedureFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteProcedure),
      mergeMap((action) =>
        this.apisService.delete<any>(`/procedures/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteProcedureSuccess(), GetProcedures()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteProcedureFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
