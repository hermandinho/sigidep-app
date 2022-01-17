import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ContribuableModel } from '@models/index';
import { GetContribuables } from '@store/actions';

@Component({
  selector: 'app-create-contribuable-form',
  templateUrl: './create-contribuable-form.component.html',
  styleUrls: ['./create-contribuable-form.component.scss'],
})
export class CreateContribuableFormComponent
  extends BaseComponent
  implements OnInit
{
  public regimes = [
    { regime: 'REEL', label: 'REEL' },
    { regime: 'SIMPLIFIE', label: 'SIMPLIFIE' },
  ];
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
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      raisonSociale: [undefined, [Validators.required]],
      secteurActivite: [undefined, [Validators.required]],
      regimeFiscal: [undefined, [Validators.required]],
      adresse: [undefined, [Validators.required]],
      quartier: [undefined, [Validators.required]],
      localisation: [undefined, [Validators.required]],
      siege: [undefined, [Validators.required]],
      ville: [undefined, [Validators.required]],
      contact: [undefined, [Validators.required]],
      email: [],
      codeBanque: [
        undefined,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      codeAgence: [
        undefined,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      numeroCompte: [
        undefined,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      cle: [
        undefined,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
    });
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
        codeBanque,
        codeAgence,
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
        codeBanque,
        codeAgence,
        numeroCompte,
        cle,
      });
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    this.busy = true;

    if (this.isUpdateForm) {
      this._apisService
        .put<ContribuableModel>('/contribuables', {
          ...this.form.value,
        })
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
        .post<ContribuableModel>('/contribuables', {
          ...this.form.value,
        })
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
}
