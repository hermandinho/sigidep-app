import { createAction, props } from '@ngrx/store';
import { LoginModel, LoginSuccessModel } from '@models/auth.model';
import { UserModel } from '@models/user.model';

export const Login = createAction(
  '[Auth] Login',
  props<{ payload: LoginModel }>()
);

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ payload: LoginSuccessModel }>()
);

export const LoginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const GetCurrentAuth = createAction('[Auth] Get current user');

export const InitAuthFromLocalStorage = createAction(
  '[Auth] Init auth from LocalStorage user'
);

export const GetCurrentAuthSuccess = createAction(
  '[Auth] Get current user success',
  props<{ user: UserModel }>()
);

export const GetCurrentAuthFailure = createAction(
  '[Auth] Get current user failure',
  props<{ error: any }>()
);

export const AfterAuthSuccess = createAction('[Auth] After auth success');
