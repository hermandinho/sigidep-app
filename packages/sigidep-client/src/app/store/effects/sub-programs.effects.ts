import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateSubProgram,
  CreateSubProgramFailure,
  CreateSubProgramSuccess,
  GetSubPrograms,
  GetSubProgramsFailure,
  GetSubProgramsSuccess,
} from '@store/actions';
import { SubProgramModel } from '@models/index';

@Injectable()
export class SubProgramsEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetSubPrograms),
      mergeMap((action) =>
        this.apisService.get<SubProgramModel[]>('/sub-programs').pipe(
          switchMap((payload) => {
            return [GetSubProgramsSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetSubProgramsFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateSubProgram),
      mergeMap((action) =>
        this.apisService
          .post<SubProgramModel>('/sub-programs', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateSubProgramSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateSubProgramFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
