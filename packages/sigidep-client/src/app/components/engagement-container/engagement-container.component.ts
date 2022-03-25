import { GetEngagementJuridiques } from '@actions/engagement-juridique.actions';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { EngagementJuridiqueModel } from '@models/engagement-juridique.model';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { GetEngagementCommandes } from '@actions/engagement-commande.actions';
import { GetExercises } from '@actions/exercises.actions';
import { GetProcedures } from '@actions/exec-procedure.actions';
import { GetAdministrativeUnites } from '@actions/administrative-units.actions';
import { GetTypesProcedures } from '@actions/types-procedures.actions';
import { GetEncours } from '@actions/encours.actions';
import * as moment from 'moment';
import {
  MAX_AMOUNT_PROCEDURE_1110,
  MAX_AMOUNT_PROCEDURE_1111,
} from './engagement-container.conts';

type Step = 'common' | 'mission' | 'decision' | 'command';
@Component({
  selector: 'app-engagement-container',
  templateUrl: './engagement-container.component.html',
  styleUrls: ['./engagement-container.component.scss'],
})
export class EngagementContainerComponent
  extends BaseComponent
  implements OnInit
{
  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>(
    'common'
  );
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();
  public form!: FormGroup;

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
    //this._initListeners();
  }

  currentProcedure!: any;

  ngOnInit() {
    this.form = this._fb.group({
      commandForm: this._fb.group({
        niuContribuable: [undefined],
        montantTTC: '',
        raisonSociale: '',
        codeBanqueContribuable: '',
        codeAgenceContribuable: '',
        numeroCompteContribuable: '',
        cleCompteContribuable: '',
        tauxTVA: '',
        taxesApplicable: this._fb.group({
          id: '',
          code: '',
          label: '',
          TxTVA: '',
          TxIR: '',
        }),
      }),
      commonForm: this._fb.group({
        id: [undefined],
        codeProcedure: [undefined, Validators.required],
        exercise: [undefined, Validators.required],
        montantAE: [undefined, [Validators.required, this.montantAEValidator]],
        adminUnit: [undefined],
        imputation: [undefined, Validators.required],
        numero: [undefined],
        reference: [undefined],
        task: [undefined],
        activity: [undefined],
        action: [undefined],
        subProgram: [undefined],
        dateSignature: [undefined, [this.dateValidator]],
        signataire: [undefined],
        objet: [undefined],
        paragraph: [undefined],
        etat: [undefined],
      }),
    });

    this._store.dispatch(GetEncours());
    this._store.dispatch(GetTypesProcedures());

    if (this.config.data?.item) {
      const {
        id,
        codeProcedure,
        exercise,
        montantAE,
        adminUnit,
        imputation,
        numero,
        reference,
        task,
        activity,
        action,
        subProgram,
        dateSignature,
        signataire,
        objet,
        paragraph,
        etat,
        niuContribuable,
        montantTTC,
        raisonSociale,
        codeBanqueContribuable,
        codeAgenceContribuable,
        numeroCompteContribuable,
        cleCompteContribuable,
        tauxTVA,
        taxesApplicable,
      } = this.config.data?.item as EngagementCommandeModel;

      this.form.patchValue({
        commonForm: {
          id,
          codeProcedure,
          exercise,
          montantAE,
          adminUnit,
          imputation,
          numero,
          reference,
          task,
          activity,
          action,
          subProgram,
          dateSignature,
          signataire,
          objet,
          paragraph,
          etat,
        },
        commandForm: {
          niuContribuable,
          montantTTC,
          raisonSociale,
          codeBanqueContribuable,
          codeAgenceContribuable,
          numeroCompteContribuable,
          cleCompteContribuable,
          tauxTVA,
          taxesApplicable,
        },
      });
    }
  }
  dateValidator = (control: FormControl): { [s: string]: any } | null => {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isAfter(today)) {
        return { invalidDate: 'errors.futureDate' };
      }
    }
    return null;
  };

  montantAEValidator = (control: FormControl): { [s: string]: any } | null => {
    if (control.value) {
      const amount = control.value;
      const error = { invalidAmount: 'errors.invalidAmount' };
      if (
        this.currentProcedure === '1110' &&
        amount > MAX_AMOUNT_PROCEDURE_1110
      ) {
        return error;
      } else if (
        this.currentProcedure === '1111' &&
        (amount <= MAX_AMOUNT_PROCEDURE_1110 ||
          amount > MAX_AMOUNT_PROCEDURE_1111)
      ) {
        return error;
      } else if (
        this.currentProcedure === '1115' &&
        amount <= MAX_AMOUNT_PROCEDURE_1111
      ) {
        return error;
      }
    }
    return null;
  };

  get commonFormGroup(): FormGroup {
    return this.form?.get('commonForm') as FormGroup;
  }
  get commandFormGroup(): FormGroup {
    return this.form?.get('commandForm') as FormGroup;
  }

  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
    if (name === 'commonForm') {
      this.currentProcedure = this.form.value?.commonForm?.codeProcedure;
      this.form.controls['montantAE'].updateValueAndValidity();
      //console.log("TYPE ", this.currentProcedure, this.form.value?.commonForm)
    }
  }
  changeStep(currentStep: string, direction: 'forward' | 'back') {
    switch (currentStep) {
      case 'common':
        if (direction === 'forward') {
          switch (this.currentProcedure) {
            case '1111':
              this.currentStepBs.next('command');
              break;
            case '1110':
              this.currentStepBs.next('command');
              break;
            case '1115':
              this.currentStepBs.next('command');
              break;

            default:
              this.currentStepBs.next('decision');
              break;
          }
        }
        break;
      default:
        if (direction === 'back') {
          this.currentStepBs.next('common');
        }
        break;
    }
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.commonForm?.id;
  }

  submitForm() {
    const formValues = this.form.value;
    // submit the form with a service
    this.busy = true;
    const editedEngagement = {
      ...this.form.value.commonForm,
      ...this.form.value.commandForm,
    } as EngagementCommandeModel;

    if (this.isUpdateForm) {
      this._apisService
        .put<EngagementCommandeModel>(
          '/engagements/commandes',
          editedEngagement
        )
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetEngagementCommandes());

            this._appService.showToast({
              summary: 'messages.success',
              detail: 'messages.engagements.createSuccess',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.engagements.notfound';
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
        .post<EngagementCommandeModel>(
          '/engagements/commandes',
          editedEngagement
        )
        .subscribe(
          (res) => {
            this.busy = false;
            this.ref.close(res);
            this._store.dispatch(GetEngagementCommandes());

            this._appService.showToast({
              summary: 'messages.success',
              detail:
                'messages.engagements.createSuccess' +
                ': numéro: ' +
                res.numero,
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.engagements.conflict';
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
