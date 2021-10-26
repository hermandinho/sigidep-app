import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {
  GetCurrentAuth,
  GetCurrentAuthFailure,
  GetCurrentAuthSuccess,
  InitAuthFromLocalStorage,
  Login,
  LoginFailure,
  LoginSuccess
} from "@actions/auth.actions";
import {AuthService} from "@services/auth.service";
import {LocalStorageService} from "@services/local-storage.service";
import {LoginSuccessModel} from "@models/auth.model";
import {UserModel} from "@models/user.model";
import {Go} from "@store/actions";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Login),
      mergeMap((action) =>
        this.authService.login(action.payload).pipe(
          switchMap((payload: LoginSuccessModel) => {
            this.localStorageService.setAuthToken(payload.accessToken);
            return [GetCurrentAuth(), LoginSuccess({ payload })];
          }),
          catchError((err: HttpErrorResponse) => of(LoginFailure(err)))
        )
      )
    )
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCurrentAuth),
      mergeMap((action) => {
        return this.authService.me().pipe(
          switchMap((payload: UserModel) => {
            this.localStorageService.setUser(payload);
            return [GetCurrentAuthSuccess({ user: payload })];
          }),
          catchError((err: HttpErrorResponse) =>
            of(GetCurrentAuthFailure(err.error))
          )
        );
      })
    )
  );

  getCurrentUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCurrentAuthSuccess),
      mergeMap((action) => {
        return [new Go({path: [window.location.pathname ?? '/home']})]; // TODO init store
      })
    )
  );

  initAuthFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InitAuthFromLocalStorage),
      mergeMap((action) => {
        if (this.localStorageService.getAuthToken()) {
          return [GetCurrentAuth()];
        }
        // TODO log me out
        return [];
      })
    )
  );

  // @Effect()
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => [InitAuthFromLocalStorage()])
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ) {}
}
