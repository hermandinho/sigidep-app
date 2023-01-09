import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
export const GetUsers = createAction('[Users] Filter');
export const GetUsersSuccess = createAction(
  '[Users] Filter success',
  props<{ payload: UserModel[] }>()
);
export const GetUsersFailure = createAction(
  '[Users] Filter failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const CreateUsers = createAction(
  '[Users] Create Users',
  props<{ payload: UserModel }>()
);
export const CreateUsersSuccess = createAction(
  '[Users] Create Users',
  props<{ payload: UserModel }>()
);
export const CreateUsersFailure = createAction(
  '[Users] Create Users',
  props<{ error?: any }>()
);

export const DeleteUsers = createAction(
  '[Users] Delete',
  props<{ id: number }>()
);
export const DeleteUsersSuccess = createAction(
  '[Users] Delete success'
);
export const DeleteUsersFailure = createAction(
  '[Users] Delete failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
