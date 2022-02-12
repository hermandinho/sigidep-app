import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of, Subject } from 'rxjs';

import { ExecTaxesModel } from '@models/exec-taxes.model';
import { GetTaxes } from '@actions/exec-taxes.actions';

@Component({
  selector: 'app-create-taxe-form',
  templateUrl: './create-taxe-form.component.html',
  styleUrls: ['./create-taxe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaxeFormComponent extends BaseComponent implements OnInit {
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
      label: [undefined],
      TxTVA: [undefined, [Validators.min(0)]],
      TxIR: [undefined, [Validators.min(0)]],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, code, label, TxTVA, TxIR } = this.config.data
        ?.item as ExecTaxesModel;
      this.form.patchValue({
        id,
        code,
        label,
        TxTVA,
        TxIR,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    const editedTaxe = {
      ...this.form.value,
    } as ExecTaxesModel;

    if (this.isUpdateForm) {
      this._apisService.put<ExecTaxesModel>('/taxes', editedTaxe).subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetTaxes());
          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.grades.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.grades.notfound';
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
      this._apisService.post<ExecTaxesModel>('/taxes', editedTaxe).subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this._store.dispatch(GetTaxes());

          this._appService.showToast({
            summary: 'messages.success',
            detail: 'messages.taxes.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
        },
        ({ error }) => {
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.taxes.conflict';
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
