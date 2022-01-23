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
  DeleteGrade,
  DeleteGradeFailure,
  DeleteGradeSuccess,
  GetGrades,
  GetGradesFailure,
  GetGradesSuccess,
  UpdateGrade,
  UpdateGradeFailure,
  UpdateGradeSuccess,
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

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateGrade),
      mergeMap((action) =>
        this.apisService.post<GradeModel>('/grades', action.payload).pipe(
          switchMap((payload) => {
            return [UpdateGradeSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(UpdateGradeFailure(err)))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteGrade),
      mergeMap((action) =>
        this.apisService.delete<any>(`/grades/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteGradeSuccess(), GetGrades()];
          }),
          catchError((err: HttpErrorResponse) => of(DeleteGradeFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
