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
import {
  EngagementJuridiqueModel,
  Step,
} from '@models/engagement-juridique.model';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { GetEngagementCommandes } from '@actions/engagement-commande.actions';

import { GetTypesProcedures } from '@actions/types-procedures.actions';
import { GetEncours } from '@actions/encours.actions';
import * as moment from 'moment';
import { MAX_AMOUNT_PROCEDURE_1110, MAX_AMOUNT_PROCEDURE_1111 } from './consts';
import { EngagementMissionModel } from '@models/engagement-mission.model';
import { GetEngagementMissions } from '@actions/engagement-mission.actions';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { GetEngagementDecisions } from '@actions/engagement-decision.actions';
import { DialogsService } from '@services/dialogs.service';

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

  public action!: 'book' | 'edit';
  public busy = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService
  ) {
    super();
    //this._initListeners();
  }

  currentProcedure!: any;

  get isBook() {
    return this.action === 'book';
  }

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
        tauxIR: '',
        taxesApplicable: this._fb.group({
          id: '',
          code: '',
          label: '',
          TxTVA: [{ value: '', disabled: true }],
          TxIR: [{ value: '', disabled: true }],
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
        operationId: [undefined],
        aeDisponible: [undefined],
      }),
      missionForm: this._fb.group({
        typeMission: [undefined],
        matriculeBeneficiaire: [undefined],
        nomBeneficiaire: [undefined],
        itineraire: [undefined],
        dateDebut: [undefined],
        dateFin: [undefined],
        nombreJours: [undefined],
        baremeJour: [undefined],
        montant: [undefined],
      }),

      decisionForm: this._fb.group({
        matriculeBeneficiaire: [undefined],
        nomBeneficiaire: [undefined],
        numContribBudget: [undefined],
        numContribuable: [undefined],
        nomContribBudget: [undefined],
        codeUnitAdminBenef: [undefined],
        nomUnitAdminBenef: [undefined],
        montantBrut: [undefined],
        montantIRNC: [undefined],
        raisonSociale: [undefined],
        codeBanqueContribuable: [undefined],
        codeAgenceContribuable: [undefined],
        numeroCompteContribuable: [undefined],
        cleCompteContribuable: [undefined],
        tauxTVA: [undefined],
        tauxIR: [undefined],
        netAPercevoir: [undefined],
        taxesApplicable: this._fb.group({
          id: '',
          code: '',
          label: '',
          TxTVA: '',
          TxIR: '',
        }),
      }),
    });

    this._store.dispatch(GetEncours());
    this._store.dispatch(GetTypesProcedures());

    if (this.config.data?.action) {
      this.action = this.config.data?.action;
    }

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
        raisonSociale,
        codeBanqueContribuable,
        codeAgenceContribuable,
        numeroCompteContribuable,
        cleCompteContribuable,
        tauxTVA,
        tauxIR,
        taxesApplicable,
        operationId,
        type,
        matriculeBeneficiaire,
        nomBeneficiaire,
        itineraire,
        dateDebut,
        dateFin,
        nombreJours,
        baremeJour,
        montant,
        numContribBudget,
        nomContribBudget,
        codeUnitAdminBenef,
        nomUnitAdminBenef,
        montantBrut,
        montantIRNC,
        netAPercevoir,
        aeDisponible,
        numContribuable,
      } = this.config.data?.item as
        | EngagementCommandeModel
        | EngagementMissionModel
        | EngagementDecisionModel
        | any;
      this.currentProcedure = codeProcedure;
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
          operationId,
          aeDisponible,
        },
        commandForm: {
          niuContribuable,
          raisonSociale,
          codeBanqueContribuable,
          codeAgenceContribuable,
          numeroCompteContribuable,
          cleCompteContribuable,
          tauxTVA,
          tauxIR,
          taxesApplicable,
        },
        missionForm: {
          type,
          matriculeBeneficiaire,
          nomBeneficiaire,
          itineraire,
          dateDebut,
          dateFin,
          nombreJours,
          baremeJour,
          montant,
        },
        decisionForm: {
          exercise,
          adminUnit,
          matriculeBeneficiaire,
          nomBeneficiaire,
          numContribBudget,
          nomContribBudget,
          codeUnitAdminBenef,
          nomUnitAdminBenef,
          montantBrut,
          montantIRNC,
          raisonSociale,
          codeBanqueContribuable,
          codeAgenceContribuable,
          numeroCompteContribuable,
          cleCompteContribuable,
          tauxTVA,
          tauxIR,
          netAPercevoir,
          taxesApplicable,
          numContribuable,
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

  get missionFormGroup(): FormGroup {
    return this.form?.get('missionForm') as FormGroup;
  }

  get decisionFormGroup(): FormGroup {
    return this.form?.get('decisionForm') as FormGroup;
  }

  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
    if (name === 'commonForm') {
      this.currentProcedure =
        this.form.getRawValue()?.commonForm?.codeProcedure;
      //this.form.controls['montantAE'].updateValueAndValidity();
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
            case '1121':
              this.currentStepBs.next('mission');
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

  get montantAE(): number {
    return this.form.getRawValue()?.commonForm?.montantAE;
  }

  submitForm() {
    this.busy = true;
    let editedEngagement;
    if (this.isMission) {
      editedEngagement = {
        ...this.form.getRawValue()?.commonForm,
        ...this.form.getRawValue().missionForm,
      } as EngagementMissionModel;
    } else if (this.isCommand) {
      editedEngagement = {
        ...this.form.getRawValue()?.commonForm,
        ...this.form.getRawValue()?.commandForm,
      } as EngagementCommandeModel;
    } else {
      editedEngagement = {
        ...this.form.getRawValue()?.commonForm,
        ...this.form.getRawValue()?.decisionForm,
        taxesApplicable:
          this.currentProcedure !== '1126'
            ? undefined
            : this.form.getRawValue()?.decisionForm.taxesApplicable,
      } as EngagementDecisionModel;
    }

    if (this.isBook) {
      this.bookProcess(editedEngagement);
      this.ref.close();
    }

    if (!this.isBook && this.isUpdateForm) {
      const method: Observable<any> = this.isMission
        ? this._apisService.put<EngagementCommandeModel>(
            '/engagements/missions',
            editedEngagement
          )
        : this.isCommand
        ? this._apisService.put<EngagementMissionModel>(
            '/engagements/commandes',
            editedEngagement
          )
        : this._apisService.put<EngagementMissionModel>(
            '/engagements/decisions',
            editedEngagement
          );
      method.subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this.isMission
            ? this._store.dispatch(GetEngagementMissions())
            : this.isCommand
            ? this._store.dispatch(GetEngagementCommandes())
            : this._store.dispatch(GetEngagementDecisions());

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
    } else if (!this.isBook) {
      const method: Observable<any> = this.isMission
        ? this._apisService.post<EngagementMissionModel>(
            '/engagements/missions',
            editedEngagement
          )
        : this.isCommand
        ? this._apisService.post<EngagementMissionModel>(
            '/engagements/commandes',
            editedEngagement
          )
        : this._apisService.post<EngagementMissionModel>(
            '/engagements/decisions',
            editedEngagement
          );
      method.subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          this.isMission
            ? this._store.dispatch(GetEngagementMissions())
            : this.isCommand
            ? this._store.dispatch(GetEngagementCommandes())
            : this._store.dispatch(GetEngagementDecisions());

          this._appService.showToast({
            summary: 'messages.success',
            detail:
              'messages.engagements.createSuccess' + ': numéro: ' + res.numero,
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

  bookProcess = (
    engagement:
      | EngagementMissionModel
      | EngagementDecisionModel
      | EngagementCommandeModel
  ) => {
    if (this.currentStepBs.value === 'command')
      this._store.dispatch(GetEngagementCommandes());
    if (this.currentStepBs.value === 'mission')
      this._store.dispatch(GetEngagementMissions());
    this._dialogService.launchReservationEngagementDialog(
      engagement,
      this.currentStepBs.value
    );
  };

  get isCommand() {
    return (
      this.currentProcedure === '1110' ||
      this.currentProcedure === '1111' ||
      this.currentProcedure === '1115'
    );
  }

  get isMission() {
    return this.currentProcedure === '1121';
  }
}
