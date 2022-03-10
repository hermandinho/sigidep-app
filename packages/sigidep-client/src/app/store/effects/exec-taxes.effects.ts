import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';

import { ExecTaxesModel } from '@models/exec-taxes.model';
import {
  CreateTaxesuccess,
  DeleteTaxeSuccess,
  GetTaxes,
  GetTaxesFailure,
  GetTaxesSuccess,
  UpdateTaxeSuccess,
} from '@actions/exec-taxes.actions';
import {
  CreateProcedure,
  CreateProcedureFailure,
  DeleteProcedure,
  DeleteProcedureFailure,
  UpdateProcedure,
  UpdateProcedureFailure,
} from '@actions/exec-procedure.actions';

@Injectable()
export class TaxesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetTaxes),
      mergeMap((action) =>
        this.apisService.get<ExecTaxesModel[]>('/taxes').pipe(
          switchMap((payload) => {
            return [GetTaxesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetTaxesFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateProcedure),
      mergeMap((action) =>
        this.apisService.post<ExecTaxesModel>('/taxes', action.payload).pipe(
          switchMap((payload) => {
            return [CreateTaxesuccess({ payload })];
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
        this.apisService.post<ExecTaxesModel>('/taxes', action.payload).pipe(
          switchMap((payload) => {
            return [UpdateTaxeSuccess({ payload })];
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
        this.apisService.delete<any>(`/taxes/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteTaxeSuccess(), GetTaxes()];
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
