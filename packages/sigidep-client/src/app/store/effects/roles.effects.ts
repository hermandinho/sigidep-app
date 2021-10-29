import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {ApisService} from "@services/apis.service";

import {PermissionModel, RoleModel} from "@models/role.model";
import {
  DeleteRole,
  DeleteRoleFailure,
  DeleteRoleSuccess,
  GetRoles,
  GetRolesFailure,
  GetRolesSuccess,
  UpdateRolePermissions,
  UpdateRolePermissionsFailure,
  UpdateRolePermissionsSuccess
} from "@store/actions";

@Injectable()
export class RolesEffects {
  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetRoles),
      mergeMap((action) =>
        this.apisService.get<{roles: RoleModel[], permissions: PermissionModel[]}>('/roles').pipe(
          switchMap((payload) => {
            return [GetRolesSuccess({payload})];
          }),
          catchError((err: HttpErrorResponse) => of(GetRolesFailure(err)))
        )
      )
    )
  );

  updatePermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateRolePermissions),
      mergeMap((action) =>
        this.apisService.patch<any>(`/roles/${action.roleId}/permissions`, {
          ids: action.ids
        }).pipe(
          switchMap((payload) => {
            return [UpdateRolePermissionsSuccess()];
          }),
          catchError((err: HttpErrorResponse) => of(UpdateRolePermissionsFailure(err)))
        )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteRole),
      mergeMap((action) =>
        this.apisService.delete<any>(`/roles/${action.id}`, {}).pipe(
          switchMap((payload) => {
            return [DeleteRoleSuccess(), GetRoles()];
          }),
          catchError((err: HttpErrorResponse) => of(DeleteRoleFailure(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apisService: ApisService,
  ) {}
}
