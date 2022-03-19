import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { TypeProcedureModel } from '@models/type-procedure.model';
import { GetTypesProcedures } from '@actions/types-procedures.actions';

@Component({
  selector: 'app-create-type-procedure-form',
  templateUrl: './create-type-procedure-form.component.html',
  styleUrls: ['./create-type-procedure-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTypeProcedureFormComponent
  extends BaseComponent
  implements OnInit
{
  loading$: Observable<boolean> = of(true);
  public form: FormGroup;

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
    this.form = this._fb.group({
      id: [],
      code: [undefined, Validators.required],
      label: [undefined, Validators.required],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, code, label } = this.config.data?.item as TypeProcedureModel;
      this.form.patchValue({
        id,
        code,
        label,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    const editedTypeProcedure = {
      ...this.form.value,
    } as TypeProcedureModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<TypeProcedureModel>('/types-procedures', editedTypeProcedure)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetTypesProcedures());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.typesProcedures.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.typesProcedures.notfound';
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
        .post<TypeProcedureModel>('/types-procedures', editedTypeProcedure)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetTypesProcedures());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.typesProcedures.createSuccess',
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
}
