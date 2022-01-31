import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { BaremeMissionModel } from '@models/bareme-mission.model';
import { GetBaremes } from '@actions/baremes.actions';

@Component({
  selector: 'app-create-bareme-form',
  templateUrl: './create-bareme-form.component.html',
  styleUrls: ['./create-bareme-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBaremeFormComponent extends BaseComponent implements OnInit {
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
      id: [undefined],
      code: [undefined, Validators.required],
      montant: [undefined, [Validators.required, Validators.min(0.0)]],
    });
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, code, montant } = this.config.data
        ?.item as BaremeMissionModel;
      this.form.patchValue({
        id,
        code,
        montant,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;
    const editedBareme = {
      ...this.form.value,
    } as BaremeMissionModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<BaremeMissionModel>('/baremes-missions', editedBareme)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetBaremes());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.baremes.createSuccess',
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
      this._apisService
        .post<BaremeMissionModel>('/baremes-missions', editedBareme)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetBaremes());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.baremes.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.baremes.conflict';
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
