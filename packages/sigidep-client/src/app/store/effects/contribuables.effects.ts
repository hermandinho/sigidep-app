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
} from '@store/actions';
import { ContribuableModel } from '@models/contribuable.model';
import {
  CreateContribuable,
  CreateContribuableFailure,
  CreateContribuableSuccess,
  GetContribuables,
  GetContribuablesFailure,
  GetContribuablesSuccess,
  UpdateContribuable,
  UpdateContribuableFailure,
  UpdateContribuableSuccess,
} from '@actions/contribuables.actions';

@Injectable()
export class ContribuablesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetContribuables),
      mergeMap((action) =>
        this.apisService.get<ContribuableModel[]>('/contribuables').pipe(
          switchMap((payload) => {
            return [GetContribuablesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetContribuablesFailure(err))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateContribuable),
      mergeMap((action) =>
        this.apisService
          .post<ContribuableModel>('/contribuables', action.payload)
          .pipe(
            switchMap((payload) => {
              return [CreateContribuableSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateContribuableFailure(err))
            )
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateContribuable),
      mergeMap((action) =>
        this.apisService
          .post<ContribuableModel>('/contribuables', action.payload)
          .pipe(
            switchMap((payload) => {
              return [UpdateContribuableSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(UpdateContribuableFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
