import { Component, OnInit } from '@angular/core';
import { GetUsers } from '../../store/actions/users.actions';
import { UserModel } from '../../models/user.model';
import { BaseComponent } from '../base.component';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppService } from '../../services/app.service';
import { ApisService } from '../../services/apis.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { GetRoles } from '../../store/actions/roles.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/roles.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent   extends BaseComponent
implements OnInit
{
loading$: Observable<boolean> = of(true);
public form: FormGroup;

public busy = false;
  data: any;
constructor(
  public ref: DynamicDialogRef,
  public config: DynamicDialogConfig,
  private _fb: FormBuilder,
  private _appService: AppService,
  private _apisService: ApisService,
  private _store: Store<AppState>,
) {
  super();
  this.form = this._fb.group({
    id: [],
    firstName: [undefined, Validators.required],
    lastName: [undefined, Validators.required],
    email: [undefined, [Validators.required, Validators.email]],
    username: [undefined, Validators.required],
    role: [undefined],
  });
  this._initListeners()
}

get isUpdateForm(): boolean {
  return !!this.form?.value?.id;
}

ngOnInit(): void {
  this._store.dispatch(GetRoles());
  if (this.config.data?.item) {
    this.form.controls['username'].disable()
    const { id, firstName, lastName, username, email, role } = this.config.data?.item as UserModel;
    this.form.patchValue({
      id,
      firstName,
      lastName,
      username,
      email,
      role
    });
  }
}

close() {
  this.ref.close();
}

submit() {
  this.busy = true;
  const editedUser = {
    ...this.form.value,
  } as UserModel;

  if (this.isUpdateForm) {
    this._apisService
      .put<UserModel>('/users', editedUser)
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetUsers());
          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.users.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.users.notfound';
          } else {
            err = 'errors.unknown';
          }
          this.busy = false;
          this._appService.showToast({
            detail: err,
            summary: 'errors.error',
            severity: 'error',
            life: 5000,
            closable: true,
          });
        }
      );
  } else {
    this._apisService
      .post<UserModel>('/users', editedUser)
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetUsers());

          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.users.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.typesProcedures.conflict';
          } else {
            err = 'errors.unknown';
          }
          this.busy = false;
          this._appService.showToast({
            detail: err,
            summary: 'errors.error',
            severity: 'error',
            life: 5000,
            closable: true,
          });
        }
      );
  }
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
      console.log(data)
    });
}

}
