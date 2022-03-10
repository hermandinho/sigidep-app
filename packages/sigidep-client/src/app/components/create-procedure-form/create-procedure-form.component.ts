import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { ExecProcedureModel } from '@models/exec-procedure.model';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/types-procedures.reducer';
import { TypeProcedureModel } from '@models/type-procedure.model';
import { GetProcedures } from '@actions/exec-procedure.actions';
import { TranslateService } from '@ngx-translate/core';
import { GetTypesProcedures } from '@actions/types-procedures.actions';

@Component({
  selector: 'app-create-procedure-form',
  templateUrl: './create-procedure-form.component.html',
  styleUrls: ['./create-procedure-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProcedureFormComponent
  extends BaseComponent
  implements OnInit
{
  public typesProcedures: TypeProcedureModel[] = [];
  loading$: Observable<boolean> = of(true);
  public form: FormGroup;
  public busy = false;

  public types: TypeProcedureModel[] = [];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    public translate: TranslateService
  ) {
    super();
    this.form = this._fb.group({
      id: [undefined],
      typeProcedure: this._fb.group({
        id: [undefined],
        code: [undefined, Validators.required],
        label: [],
      }),
      matriculeAgent: [undefined],
      nomAgent: [undefined],
      numContribuable: [undefined],
      nomContribuable: [undefined],
      TxTVA: [undefined],
      TxIR: [undefined],
      RIB: [undefined],
    });

    this.types = [
      { label: 'BAC', code: '1110' } as TypeProcedureModel,
      { label: 'LC', code: '1111' } as TypeProcedureModel,
      { label: 'MARCHE', code: '1115' } as TypeProcedureModel,
      { label: 'MISSION', code: '1121' } as TypeProcedureModel,
      { label: 'PRIME', code: '1122' } as TypeProcedureModel,
      { label: 'RELEVE', code: '1123' } as TypeProcedureModel,
      { label: 'MDAGENT', code: '1124' } as TypeProcedureModel,
      { label: 'MDSTRUCTURE', code: '1125' } as TypeProcedureModel,
      { label: 'DEBLOCAGE', code: '1126' } as TypeProcedureModel,
    ];
    this._initListeners();
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.id;
  }

  ngOnInit(): void {
    this._store.dispatch(GetTypesProcedures());
    if (this.config.data?.item) {
      const {
        id,
        typeProcedure,
        matriculeAgent,
        nomAgent,
        numContribuable,
        nomContribuable,
        TxTVA,
        TxIR,
        RIB,
      } = this.config.data?.item as ExecProcedureModel;
      this.form.patchValue({
        id,
        typeProcedure: {
          id: typeProcedure.id,
          code: typeProcedure.code,
          label: typeProcedure.label,
        },
        matriculeAgent,
        nomAgent,
        numContribuable,
        nomContribuable,
        TxTVA,
        TxIR,
        RIB,
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
        this.typesProcedures = [...payload];
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  submit() {
    this.busy = true;
    const editedProcedure = {
      ...this.form.value,
      typeProcedure: this.typesProcedures.find(
        (item) => item.code === this.form.value?.typeProcedure?.code
      ),
    } as ExecProcedureModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<ExecProcedureModel>('/procedures', editedProcedure)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetProcedures());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.procedures.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.articles.notfound';
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
        .post<ExecProcedureModel>('/procedures', editedProcedure)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetProcedures());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.procedures.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.procedures.conflict';
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
