import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of, Subject } from 'rxjs';
import { RubriqueModel } from '@models/rubrique.model';
import { SousRubriqueModel } from '@models/sous-rubrique.model';

import { GetRubriques } from '@actions/rubriques.actions';

@Component({
  selector: 'app-create-rubrique-form',
  templateUrl: './create-rubrique-form.component.html',
  styleUrls: ['./create-rubrique-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRubriqueFormComponent
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
      code: [undefined, [Validators.required, Validators.pattern('[0-9]{2}')]],
      label: [undefined, Validators.required],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, code, label } = this.config.data?.item as RubriqueModel;
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
    const editedRubrique = {
      ...this.form.value,
    } as RubriqueModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<RubriqueModel>('/mercuriales/rubriques', editedRubrique)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetRubriques());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.rubriques.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.rubriques.notfound';
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
        .post<RubriqueModel>('/mercuriales/rubriques', editedRubrique)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetRubriques());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.rubriques.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.rubriques.conflict';
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
