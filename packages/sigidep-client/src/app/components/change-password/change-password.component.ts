import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppService } from '../../services/app.service';
import { ApisService } from '../../services/apis.service';
import { AppState } from '../../store/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseComponent
implements OnInit
{
loading$: Observable<boolean> = of(true);
public resetPasswordForm: FormGroup;

confirmPasswordClass = 'form-control';

public busy = false;
constructor(
  public ref: DynamicDialogRef,
  public config: DynamicDialogConfig,
  private _fb: FormBuilder,
  private _appService: AppService,
  private _apisService: ApisService,
  private _store: Store<AppState>
) {
  super();
  /* Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ) */
  this.resetPasswordForm = this._fb.group({
    password: [undefined, [
    (c: AbstractControl) => Validators.required(c),
  ]],
    newPassword: [undefined, [
    (c: AbstractControl) => Validators.required(c)
  ]],
    confirmPassword: [undefined, [
    (c: AbstractControl) => Validators.required(c),
  ]],
  },
  {
    validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
  });
}


ngOnInit(): void {
}
get f() {
  return this.resetPasswordForm.controls;
}
ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmedValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
close() {
  this.ref.close();
}

submit() {
  this.busy = true;
  const editedUser = {
    ...this.resetPasswordForm.value,
  } as any;
  console.log(editedUser)

    this._apisService
      .patch<any>('/auth/changePassword', editedUser)
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
         /*  this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.users.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          }); */
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.user.conflict';
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
