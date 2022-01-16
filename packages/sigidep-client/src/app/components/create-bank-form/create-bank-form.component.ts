import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { AppService } from './../../services/app.service';
import { ApisService } from './../../services/apis.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from './../base.component';
import { Component, OnInit } from '@angular/core';
import { BankModel } from '@models/banque.model';
import { GetBanks } from '@actions/banks-agences.actions';

@Component({
  selector: 'app-create-bank-form',
  templateUrl: './create-bank-form.component.html',
  styleUrls: ['./create-bank-form.component.scss'],
})
export class CreateBankFormComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private _fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>
  ) {
    super();
    this.form = this._fb.group({
      code: [
        undefined,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      label: [undefined, [Validators.required]],
      id: [undefined, []],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, label, code } = this.config.data?.item as BankModel;
      this.form.patchValue({
        id,
        label,
        code,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;

    /* if (this.isUpdateForm) {
      this.busy = false; // TODO
      return;
    } */

    (() => {
      if (!this.isUpdateForm) {
        return this._apisService.post<BankModel>(`/banks`, {
          ...this.form.value,
        });
      } else {
        return this._apisService.patch<BankModel>(`/banks/${this.form.value['id']}`, {
          ...this.form.value,
        });
      }
    })().subscribe(
      (res) => {
        this.busy = false;
        this.ref.close(res);
        this._store.dispatch(GetBanks());

        this._appService.showToast({
          summary: 'messages.success',
          detail: 'messages.paragraphs.createSuccess',
          severity: 'success',
          life: 3000,
          closable: true,
        });
      },
      ({ error }) => {
        let err = '';
        if (error?.statusCode === 409) {
          err = 'errors.paragraphs.conflict';
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
