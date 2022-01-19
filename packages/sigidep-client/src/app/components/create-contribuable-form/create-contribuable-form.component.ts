import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ContribuableModel } from '@models/index';
import { GetContribuables } from '@store/actions';
import { Observable, of, Subject } from 'rxjs';
import { RegimeFiscalModel } from '@models/regime-fiscal.model';
import { BankModel } from '@models/banque.model';
import { AgenceModel } from '@models/agence.model';
import { getDataSelector, getLoadingSelector } from '@reducers/regimes.reducer';
import {
  getDataSelector as getBankDataSelector,
  getLoadingSelector as getBankLoadingSelector,
} from '@reducers/banks-agences.reducers';

import { map } from 'rxjs/operators';
import { ContribuablesModule } from '@pages/contribuables/contribuables.module';

@Component({
  selector: 'app-create-contribuable-form',
  templateUrl: './create-contribuable-form.component.html',
  styleUrls: ['./create-contribuable-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateContribuableFormComponent
  extends BaseComponent
  implements OnInit
{
  public regimes: RegimeFiscalModel[] = [];
  loading$: Observable<boolean> = of(true);
  public banques: BankModel[] = [];
  public agences: AgenceModel[] = [];
  public contactPattern =
    '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$';
  public codePattern = '^[a-zA-Z][0-9]{12}[a-zA-Z]$';
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
      id: [undefined, []],
      code: [
        undefined,
        [Validators.required, Validators.pattern(this.codePattern)],
      ],
      raisonSociale: [undefined, [Validators.required]],
      secteurActivite: [undefined, [Validators.required]],

      adresse: [undefined, [Validators.required]],
      quartier: [undefined, [Validators.required]],
      localisation: [undefined, [Validators.required]],
      siege: [undefined, [Validators.required]],
      ville: [undefined, [Validators.required]],
      contact: [
        undefined,
        [Validators.required, Validators.pattern(this.contactPattern)],
      ],
      email: [undefined, [Validators.email]],
      numeroCompte: [
        undefined,
        [Validators.required, Validators.pattern('[0-9]{11}')],
      ],
      cle: [
        undefined,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[0-9]{2}'),
        ],
      ],
      regimeFiscal: this._fb.group({
        id: [],
        code: [],
        description: [],
      }),
      banque: this._fb.group({
        id: [],
        code: [],
        label: [],
      }),
      agence: this._fb.group({
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
      const {
        id,
        code,
        raisonSociale,
        secteurActivite,
        regimeFiscal,
        adresse,
        quartier,
        localisation,
        siege,
        ville,
        contact,
        email,
        banque,
        agence,
        numeroCompte,
        cle,
      } = this.config.data?.item as ContribuableModel;
      this.form.patchValue({
        id,
        code,
        raisonSociale,
        secteurActivite,
        regimeFiscal,
        adresse,
        quartier,
        localisation,
        siege,
        ville,
        contact,
        email,
        banque,
        agence,
        numeroCompte,
        cle,
      });
      this.agences =
        this.banques.find((item) => item.code === banque.code)?.agences ?? [];
    }
  }

  close() {
    this.ref.close();
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((payload) => {
        this.regimes = [...payload];
      });

    this._store
      .pipe(this.takeUntilDestroy, select(getBankDataSelector))
      .subscribe((payload) => {
        this.banques = [...payload];
        this.agences =
          this.banques.find(
            (item) => item.code === this.form.value?.banque?.code
          )?.agences ?? [];
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  submit() {
    this.busy = true;
    const editedContribuable = {
      ...this.form.value,
      banque: this.banques.find(
        (item) => item.code === this.form.value?.banque?.code
      ),
      agence: this.agences?.find(
        (item) => item.code === this.form.value?.agence?.code
      ),
      regimeFiscal: this.regimes?.find(
        (item) => item.code === this.form.value?.regimeFiscal?.code
      ),
    } as ContribuableModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<ContribuableModel>('/contribuables', editedContribuable)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetContribuables());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.contribuables.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.contribuables.notfound';
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
        .post<ContribuableModel>('/contribuables', editedContribuable)
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetContribuables());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.contribuables.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.contribuables.conflict';
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
  onChange = (event: any) => {
    this.agences =
      this.banques.find((item) => item.code === event.value)?.agences ?? [];
  };
}
