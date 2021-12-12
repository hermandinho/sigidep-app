import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  DeleteTechnicalSupervisor,
  DeleteTechnicalSupervisorFailure,
  DeleteTechnicalSupervisorSuccess,
  GetTechnicalSupervisors,
  GetTechnicalSupervisorsFailure,
  GetTechnicalSupervisorsSuccess,
} from '@store/actions';
import { TechnicalSupervisorModel } from '@models/index';

@Injectable()
export class TechnicalSupervisorEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetTechnicalSupervisors),
      mergeMap((action) =>
        this.apisService
          .get<TechnicalSupervisorModel[]>('/technical-supervisors')
          .pipe(
            switchMap((payload) => {
              return [GetTechnicalSupervisorsSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetTechnicalSupervisorsFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteTechnicalSupervisor),
      mergeMap((action) =>
        this.apisService
          .delete<any>(`/technical-supervisors/${action.id}`, {})
          .pipe(
            switchMap((payload) => {
              return [
                DeleteTechnicalSupervisorSuccess(),
                GetTechnicalSupervisors(),
              ];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteTechnicalSupervisorFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
