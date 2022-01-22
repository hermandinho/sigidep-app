import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of, Subject } from 'rxjs';
import { RubriqueModel } from '@models/rubrique.model';

import { SousRubriqueModel } from '@models/sous-rubrique.model';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/rubriques.reducer';
import { map } from 'rxjs/operators';
import { GetSousRubriques } from '@actions/sous-rubriques.actions';

@Component({
  selector: 'app-create-sous-rubrique-form',
  templateUrl: './create-sous-rubrique-form.component.html',
  styleUrls: ['./create-sous-rubrique-form.component.scss'],
})
export class CreateSousRubriqueFormComponent
  extends BaseComponent
  implements OnInit
{
  public rubriques: RubriqueModel[] = [];
  rubriquesLoading$: Observable<boolean> = of(true);

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
      code: [undefined, Validators.pattern('[0-9]{3}')],
      label: [undefined, Validators.required],
      rubrique: this._fb.group({
        id: [],
        code: [],
        label: [],
      }),
    });
    this._initListeners();
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    if (this.config.data?.item) {
      const { id, code, label, rubrique } = this.config.data
        ?.item as SousRubriqueModel;
      this.form.patchValue({
        id,
        code,
        label,
        rubrique,
      });
    }
  }

  close() {
    this.ref.close();
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((payload) => {
        this.rubriques = [...payload];
      });

    this.rubriquesLoading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  submit() {
    this.busy = true;
    const editedSousRubrique = {
      ...this.form.value,
      rubrique: this.rubriques.find(
        (item) => item.code === this.form.value?.rubrique?.code
      ),
    } as SousRubriqueModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<SousRubriqueModel>(
          '/mercuriales/sous-rubriques',
          editedSousRubrique
        )
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetSousRubriques());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.sousRubriques.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.agents.notfound';
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
        .post<SousRubriqueModel>(
          '/mercuriales/sous-rubriques',
          editedSousRubrique
        )
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetSousRubriques());
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.sousRubriques.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.sousRubriques.conflict';
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
