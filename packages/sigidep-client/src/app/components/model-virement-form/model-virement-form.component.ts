import { GetModeleVirement } from '@actions/model-virement.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { ModeleVirementModel } from '@models/modele-virement.model';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-model-virement-form',
  templateUrl: './model-virement-form.component.html',
  styleUrls: ['./model-virement-form.component.scss']
})
export class ModelVirementFormComponent
  extends BaseComponent
  implements OnInit {
  public modeleVirement: ModeleVirementModel[] = [];
  loading$: Observable<boolean> = of(true);
  public form: FormGroup;

  public busy = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>) {
    super();
    this.form = this._fb.group({
      id: [],
      nomModel: [undefined],
      enteteModel: [undefined],
      chapeauModel: [undefined],
    });
  }

  close() {
    this.ref.close();
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const {
        id,
        nomModel,
        enteteModel,
        chapeauModel,
      } = this.config.data?.item as ModeleVirementModel;
      this.form.patchValue({
        id,
        nomModel,
        enteteModel,
        chapeauModel,
      });
    }
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  submit() {
    this.busy = true;
    const editModeleVirement = {
      ...this.form.value,
    } as ModeleVirementModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<ModeleVirementModel>('/modele-virements', editModeleVirement)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetModeleVirement());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.modeleVirement.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.modeleVirement.notfound';
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
        .post<ModeleVirementModel>('/modele-virements', editModeleVirement)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetModeleVirement());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.modeleVirement.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.article.conflict';
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
