import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  DeleteAdministrativeUnit,
  DeleteAdministrativeUnitSuccess,
  GetAdministrativeUnites,
  GetAdministrativeUnitesFailure,
  GetAdministrativeUnitesSuccess,
  GetFunctions,
  GetFunctionsFailure,
  GetFunctionsSuccess,
} from '@store/actions';
import {
  AdministrativeUnitModel,
  FunctionModel,
} from '@models/administrative-unit.model';

@Injectable()
export class AdministrativeUnitsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAdministrativeUnites),
      mergeMap((action) =>
        this.apisService
          .get<AdministrativeUnitModel[]>('/administrative-units')
          .pipe(
            switchMap((payload) => {
              return [GetAdministrativeUnitesSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetAdministrativeUnitesFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteAdministrativeUnit),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/administrative-units/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [
                DeleteAdministrativeUnitSuccess(),
                GetAdministrativeUnites(),
              ];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetAdministrativeUnitesFailure(err))
            )
          )
      )
    )
  );

  filterFunctions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetFunctions),
      mergeMap((action) =>
        this.apisService
          .get<FunctionModel[]>(`/functions`, { type: action._type })
          .pipe(
            switchMap((payload) => {
              return [GetFunctionsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) => of(GetFunctionsFailure(err)))
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
