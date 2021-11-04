import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { LoginFailure } from '@actions/auth.actions';
import {
  DeleteExercises,
  DeleteExercisesFailure,
  DeleteExercisesSuccess,
  GetExercises,
  GetExercisesSuccess,
} from '@actions/exercises.actions';
import { ApisService } from '@services/apis.service';
import { ExerciseModel } from '@models/exercise.model';

@Injectable()
export class ExercisesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetExercises),
      mergeMap((action) =>
        this.apisService
          .get<ExerciseModel[]>(
            '/exercises',
            action.status && { status: action.status }
          )
          .pipe(
            switchMap((payload) => {
              return [GetExercisesSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) => of(LoginFailure(err)))
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteExercises),
      mergeMap((action) =>
        this.apisService
          .delete<void>('/exercises', { ids: action.ids?.join(',') })
          .pipe(
            switchMap(() => {
              return [
                DeleteExercisesSuccess({ ids: action.ids }),
                GetExercises({}),
              ];
            }),
            catchError((err: HttpErrorResponse) =>
              of(DeleteExercisesFailure(err))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
