import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApisService } from '@services/apis.service';
import { GetUsers, GetUsersSuccess, GetUsersFailure, CreateUsers, CreateUsersSuccess, CreateUsersFailure, DeleteUsers, DeleteUsersSuccess, DeleteUsersFailure } from '../actions/users.actions';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UserEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUsers),
      mergeMap((action) =>
        this.apisService
          .get<UserModel[]>('/users')
          .pipe(
            switchMap((payload) => {
              return [GetUsersSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(GetUsersFailure(err))
            )
          )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateUsers),
      mergeMap((action) =>
        this.apisService
          .post<UserModel>(
            '/users',
            action.payload
          )
          .pipe(
            switchMap((payload) => {
              return [CreateUsersSuccess({ payload })];
            }),
            catchError((err: HttpErrorResponse) =>
              of(CreateUsersFailure(err))
            )
          )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteUsers),
      mergeMap((action) =>
        this.apisService.delete<any>(`/users/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteUsersSuccess(), GetUsers()];
          }),
          catchError((err: HttpErrorResponse) =>
            of(DeleteUsersFailure(err))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apisService: ApisService) {}
}
