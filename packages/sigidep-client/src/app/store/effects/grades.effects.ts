import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import {
  CreateGrade,
  CreateGradeFailure,
  CreateGradeSuccess,
  GetGrades,
  GetGradesFailure,
  GetGradesSuccess,
} from '@actions/grades.actions';
import { GradeModel } from '@models/grade.model';

@Injectable()
export class GradesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetGrades),
      mergeMap((action) =>
        this.apisService.get<GradeModel[]>('/grades').pipe(
          switchMap((payload) => {
            return [GetGradesSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(GetGradesFailure(err)))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateGrade),
      mergeMap((action) =>
        this.apisService.post<GradeModel>('/grades', action.payload).pipe(
          switchMap((payload) => {
            return [CreateGradeSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(CreateGradeFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
