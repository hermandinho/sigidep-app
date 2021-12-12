import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { BaseComponent } from '@components/base.component';
import { RoleModel } from '@models/role.model';
import { ExerciseModel } from '@models/exercise.model';
import { GetRoles } from '@store/actions';

@Component({
  selector: 'app-create-role-form',
  templateUrl: './create-role-form.component.html',
  styleUrls: ['./create-role-form.component.scss'],
})
export class CreateRoleFormComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private readonly _dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>
  ) {
    super();
    this.form = this._fb.group({
      label: [undefined, [Validators.required]],
      id: [undefined, []],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, label } = this.config.data?.item as RoleModel;
      this.form.patchValue({
        id,
        label,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;

    if (this.isUpdateForm) {
      this.busy = false; // TODO
      return;
    }
    this._apisService
      .post<ExerciseModel>('/roles', {
        ...this.form.value,
      })
      .subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetRoles());

          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.roles.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          console.log(error);
          let err = 'errors.exercises.conflict';
          if (error?.statusCode === 409) {
            err = 'errors.roles.conflict';
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
