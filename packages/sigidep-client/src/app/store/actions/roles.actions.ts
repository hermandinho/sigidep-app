import { createAction, props } from '@ngrx/store';
import { PermissionModel, RoleModel } from '@models/role.model';

export const GetRoles = createAction('[Roles] Get roles');
export const GetRolesSuccess = createAction(
  '[Roles] Get roles success',
  props<{ payload: { roles: RoleModel[]; permissions: PermissionModel[] } }>()
);
export const GetRolesFailure = createAction(
  '[Roles] Get roles failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const UpdateRolePermissions = createAction(
  '[Roles] Update permissions',
  props<{ ids: number[]; roleId: number }>()
);
export const UpdateRolePermissionsSuccess = createAction(
  '[Roles] Update permissions success'
);
export const UpdateRolePermissionsFailure = createAction(
  '[Roles] Update permissions failure',
  props<{ error?: any }>() // TODO defile errors global model here
);

export const DeleteRole = createAction(
  '[Roles] Delete role',
  props<{ id: number }>()
);
export const DeleteRoleSuccess = createAction('[Roles] Delete role success');
export const DeleteRoleFailure = createAction(
  '[Roles] Delete role failure',
  props<{ error?: any }>() // TODO defile errors global model here
);
