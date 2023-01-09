import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { BaseComponent } from '@components/base.component';
import {
  DeleteRole,
  DeleteRoleFailure,
  DeleteRoleSuccess,
  GetRoles,
  SetAppBreadcrumb,
  UpdateRolePermissions,
  UpdateRolePermissionsFailure,
  UpdateRolePermissionsSuccess,
} from '@store/actions';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PermissionModel, RoleModel } from '@models/role.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  getDataSelector,
  getLoadingSelector,
  getPermissionsSelector,
} from '@reducers/roles.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent extends BaseComponent implements OnInit {
  data: RoleModel[] = [];
  permissions: PermissionModel[] = [];
  tableColumns!: { field: string; sortable?: boolean }[];
  public KEYS = Object.keys;

  loading$: Observable<boolean> = of(true);
  form!: FormGroup;
  busy = false;

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder,
    private readonly dispatcher: Actions,
    private _appService: AppService,
    private readonly _dialogService: DialogsService
  ) {
    super();
    this._initListeners();
  }

  public getRoleFormGroup(role: RoleModel): FormGroup {
    return this.form.get(role.id.toString()) as FormGroup;
  }

  public getPermissionControl(
    roleId: string,
    context: string,
    permissionId: string,
    value: string
  ): FormControl {
    return (this.form.get(`${roleId}.${context}.${permissionId}`) as FormGroup)
      .controls[value] as FormControl;
  }

  ngOnInit(): void {
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.roles',
          },
        ],
      })
    );
    this.tableColumns = [
      { field: 'label' },
       { field: 'description' }
    ];
    this._store.dispatch(GetRoles());
  }

  public handleGroupPermissionsGlobalClick(
    e: { value: boolean },
    role: RoleModel,
    context: string
  ): void {
    const group = this.form.get(`${role.id}.${context}`);
    for (const ctrl in group?.value) {
      const item = group?.get(ctrl);
      if (item) {
        item.get('value')?.patchValue(e.value);
      }
    }
    this.form.markAsDirty();
  }

  public submit(role: RoleModel): void {
    this.busy = true;
    const form = this.form.get(role.id.toString());
    const values = form?.value;
    let formElements: any[] = [];

    for (const key of Object.keys(values ?? {})) {
      formElements = formElements.concat(Object.values(values[key]));
    }
    const ids = formElements.filter((v) => v.value).map((v) => v.id);

    this._store.dispatch(UpdateRolePermissions({ ids, roleId: role.id }));
  }

  public getGroupPermissionGlobalCheckState(
    role: RoleModel,
    context: string
  ): boolean | null {
    const group = this.form.get(`${role.id}.${context}`);
    const allFields: { value: boolean; id: string; label: string }[] =
      Object.values(group?.value);
    const checkedFields = allFields.filter((f) => f.value);
    if (checkedFields.length === allFields.length) return true;
    else if (checkedFields.length === 0) return null;
    return checkedFields.length === allFields.length;
  }

  create() {
    this._dialogService.launchRolesCreateDialog();
  }

  edit(item: RoleModel) {
    this._dialogService.launchRolesCreateDialog(item);
  }

  delete(item: RoleModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteRole',
      accept: () => {
        this._store.dispatch(DeleteRole({ id: item.id }));
      },
    });
  }

  private _generateForm() {
    if (!this.data?.length || !this.permissions?.length) return;
    this.form = this._fb.group({});
    for (const role of this.data) {
      const groupName = role.id.toString();
      const actualPermissionsIds = (this._flatPermissions(role) ?? []).map(
        (p) => p.id
      );
      this.form.addControl(groupName, this._fb.group({}));
      for (const perm of this.permissions) {
        const group = this.form.get(groupName) as FormGroup;
        if (!group.get(perm.context)) {
          group.addControl(perm.context, this._fb.group({}));
        }
        (group.get(perm.context) as FormGroup)?.addControl(
          perm.id.toString(),
          this._fb.group({
            id: this._fb.control(perm.id),
            value: this._fb.control(actualPermissionsIds.includes(perm.id)),
            label: this._fb.control(perm.label),
            description: this._fb.control(perm.description),
            context: this._fb.control(perm.context),
          })
        );
      }
    }
    // console.log(this.form.value);
  }

  private _flatPermissions(role: RoleModel) {
    let permissions: PermissionModel[] = [];
    role?.permissions?.forEach((permission) => {
      permissions = permissions.concat(permission.permission);
    });
    return permissions;
  }

  private _initListeners() {
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = data;
        this._generateForm();
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getPermissionsSelector))
      .subscribe((data) => {
        this.permissions = data;
        console.log('permissions',data)
        this._generateForm();
      });

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(UpdateRolePermissionsSuccess, UpdateRolePermissionsFailure)
      )
      .subscribe((action) => {
        this.busy = false;
        if (action.type === UpdateRolePermissionsFailure.type) {
          if (action.error?.statusCode === 403) {
            this._appService.showUnauthorizedActionToast();
          } else {
            this._appService.showToast({
              severity: 'error',
              detail: 'errors.permissions.apply',
              summary: 'errors.error',
              closable: true,
            });
          }
        } else if (action.type === UpdateRolePermissionsSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.permissions.applySuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });

    this.dispatcher
      .pipe(this.takeUntilDestroy, ofType(DeleteRoleSuccess, DeleteRoleFailure))
      .subscribe((action) => {
        if (action.type === DeleteRoleFailure.type) {
          if (action.error?.statusCode === 403) {
            this._appService.showUnauthorizedActionToast();
          } else {
            this._appService.showToast({
              severity: 'error',
              detail: 'errors.roles.delete',
              summary: 'errors.error',
              closable: true,
            });
          }
        } else if (action.type === DeleteRoleSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.roles.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
