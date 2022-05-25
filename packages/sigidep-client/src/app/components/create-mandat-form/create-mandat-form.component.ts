import { GetEngagementMandats } from '@actions/engagement-mandat.actions';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import {
  EngagementMandatModel,
  EtatEngagementMandatEnum,
  StepMandat,
} from '@models/engagement-mandat.model';
import { EngagementMissionModel } from '@models/engagement-mission.model';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { CategorieProcedure } from 'app/utils/types';

@Component({
  selector: 'app-create-mandat-form',
  templateUrl: './create-mandat-form.component.html',
  styleUrls: ['./create-mandat-form.component.scss'],
})
export class CreateMandatFormComponent extends BaseComponent implements OnInit {
  private currentStepBs: BehaviorSubject<StepMandat> =
    new BehaviorSubject<StepMandat>('engagement');
  public currentStep$: Observable<StepMandat> =
    this.currentStepBs.asObservable();
  public form!: FormGroup;
  public action!: 'book' | 'edit';
  public busy = false;
  public currentProcedure!: string;
  public categorieProcedure!: CategorieProcedure;
  //bookProcess:any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService,
    private translate: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      engagementForm: this._fb.group({
        id: [undefined],
        codeProcedure: [undefined],
        reference: [undefined],
        dateSignature: [undefined],
        signatairej: [undefined],
        objetj: [undefined],
        imputation: [undefined],
        numeroj: [undefined],
        matriculeBeneficaire: [undefined],
        nomBeneficaire: [undefined],
        itineraire: [undefined],
        dateDebut: [undefined],
        dateFin: [undefined],
        nombreJours: [undefined],
        montantMission: [undefined],
        baremeJour: [undefined],
        numActeJuridique: this._fb.group(
          {
            id: [null]
          },
          null
        ),
        montantAE: [undefined],
        netAPercevoir: [undefined],
        montantIRNC: [undefined],
        montantBrut: [undefined],
        numContribuable:[undefined],
        raisonSociale:[undefined],
        taxesApplicable:[undefined],
        tauxTVA:[undefined],
        tauxIR:[undefined],
        RIB:[undefined],
        nomUnitAdminBenef:[undefined],
        codeUnitAdminBenef:[undefined]
      }),
      mandatForm: this._fb.group({
        numero: [undefined],
        matriculeGestionnaire: [undefined],
        nomGestionnaire: [undefined],
        objet: [undefined],
        dateEngagement: [undefined, [Validators.required, this.dateValidator]],
        montantCPChiffres: [undefined],
        montantCPLettres: [undefined],
        signataire: [undefined],
        typeMission: [undefined],
        dateAffectation: [undefined],
        typeMarche: [undefined]
      }),

      performForm: this._fb.group({
        livrables: [undefined],
        situationActuelle: [undefined],
        sourceVerif: [undefined],
      }),
    });

    if (this.config.data?.category) {
      this.categorieProcedure = this.config.data?.category;
    }
    if (this.config.data?.action) {
      this.action = this.config.data?.action;
    }

    if (this.config.data?.item) {
      const {
        id,
        codeProcedure,
        reference,
        dateSignature,
        signatairej,
        objetj,
        imputation,
        numeroj,
        matriculeBeneficaire,
        nomBeneficaire,
        itineraire,
        dateDebut,
        dateFin,
        nombreJours,
        montantMission,
        baremeJour,
        numActeJuridique,
        numero,
        matriculeGestionnaire,
        nomGestionnaire,
        objet,
        dateEngagement,
        montantCPChiffres,
        montantCPLettres,
        signataire,
        typeMission,
        livrables,
        situationActuelle,
        sourceVerif,
        dateAffectation,
        montantAE,
        netAPercevoir,
        montantIRNC,
        montantBrut,
        numContribuable,
        raisonSociale,
        taxesApplicable,
        tauxTVA,
        tauxIR,
        RIB,
        nomUnitAdminBenef,
        codeUnitAdminBenef,
        typeMarche
      } = this.config.data?.item as
        | EngagementMissionModel
        | EngagementMandatModel
        | any;
      this.form.patchValue({
        engagementForm: {
          id,
          codeProcedure,
          reference,
          dateSignature,
          signatairej,
          objetj,
          imputation,
          numeroj,
          matriculeBeneficaire,
          nomBeneficaire,
          itineraire,
          dateDebut,
          dateFin,
          nombreJours,
          montantMission,
          baremeJour,
          numActeJuridique,
          montantAE,
          netAPercevoir,
          montantIRNC,
          montantBrut,
          numContribuable,
          raisonSociale,
          taxesApplicable,
          tauxTVA,
          tauxIR,
          RIB,
          nomUnitAdminBenef,
          codeUnitAdminBenef
        },
        mandatForm: {
          numero,
          matriculeGestionnaire,
          nomGestionnaire,
          objet,
          dateEngagement,
          montantCPChiffres,
          montantCPLettres,
          signataire,
          typeMission,
          dateAffectation,
          typeMarche
        },
        performForm: {
          livrables,
          situationActuelle,
          sourceVerif,
        },
      });
    }
  }

  get engagementFormGroup(): FormGroup {
    return this.form?.get('engagementForm') as FormGroup;
  }
  get mandatFormGroup(): FormGroup {
    return this.form?.get('mandatForm') as FormGroup;
  }

  get performFormGroup(): FormGroup {
    return this.form?.get('performForm') as FormGroup;
  }

  get isUpdateForm(): boolean {
    return !!this.form?.value?.engagementForm?.id;
  }

  get isBook() {
    return this.action === 'book';
  }

  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
    if (name === 'engagementForm') {
      this.currentProcedure =
        this.form.getRawValue()?.engagementForm?.codeProcedure;
    }
  }

  changeStep(currentStep?: string, direction?: 'forward' | 'back') {
    switch (currentStep) {
      case 'engagement':
        if (direction === 'forward') {
          this.currentStepBs.next('mandat');
        }
        break;
      case 'mandat':
        if (direction === 'forward') {
          console.log(direction)
          this.currentStepBs.next('perform');
        }
        if (direction === 'back') {
          console.log(direction)
          this.currentStepBs.next('engagement');
        }
        break;
      case 'perform':
        if (direction === 'back') {
          this.currentStepBs.next('mandat');
        }
        break;

    }
  }
  bookProcess = (engagement: EngagementMandatModel) => {
    const method: Observable<any> =
      this._apisService.put<EngagementMandatModel>(
        '/mandats/reservation',
        engagement
      );

    method.subscribe(
      (res) => {
        //this.busy = false;
        this.ref.close(res);
        this._store.dispatch(
          GetEngagementMandats({ procedures: [res?.codeProcedure] })
        );
        this._dialogService.launchPrintEngagementMandatPrimeDialog(res);
        this._appService.showToast({
          summary: 'messages.success',
          detail:
            'messages.engagementsreservationSuccess' +
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
        //this.busy = false;
        this._appService.showToast({
          detail: err,
          summary: 'errors.error',
          severity: 'error',
          life: 5000,
          closable: true,
        });
      }
    );
  };

  submitForm() {
    const formValues = this.form.getRawValue();
    this.busy = true;
    let editedEngagement: EngagementMandatModel;
    editedEngagement = {
      ...this.form.getRawValue()?.engagementForm,
      ...this.form.getRawValue().mandatForm,
      ...this.form.getRawValue().performForm,
    } as EngagementMandatModel;

    if (this.isBook) {
      this.bookProcess(editedEngagement);
      localStorage.removeItem('imputation');
      this.ref.close();
    }

    if (!this.isBook && this.isUpdateForm) {
      const method: Observable<any> =
        this._apisService.put<EngagementMandatModel>(
          '/mandats',
          editedEngagement
        );
      method.subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          localStorage.removeItem('imputation');
          this._store.dispatch(
            GetEngagementMandats({ procedures: [res?.codeProcedure] })
          );
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
      this.ref.close();
      this._appService.saveConfirmation({
        message: 'dialogs.messages.saveMandat',
        accept: () => {
          const method: Observable<any> =
            this._apisService.post<EngagementMandatModel>(
              '/mandats',
              editedEngagement
            );
          method.subscribe(
            (res) => {
              console.log(res);
              this.busy = false;

              localStorage.removeItem('imputation');
              this._store.dispatch(
                GetEngagementMandats({ procedures: [res?.codeProcedure] })
              );

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
        },
      });
    }
  }

  dateValidator = (control: FormControl): { [s: string]: any } | null => {
    if (control.value) {
      const date = moment(control.value);
      const currentDate = moment(
        this.form.getRawValue()?.mandatForm.dateAffectation
      );
      if (date < currentDate) {
        return { invalidDate: 'errors.futureDate' };
      }
    }
    return null;
  };

  montantAEValidator = (control: FormControl): { [s: string]: any } | null => {
    if (control.value) {
      const error = { invalidAmount: 'errors.invalidAmount' };
      if (
        this.form.getRawValue()?.mandatForm.typeMission ===
        this.translate.instant(EtatEngagementMandatEnum.ORDINAIRE)
      ) {
        const amount =
          (75 / 100) * this.form.getRawValue()?.engagementForm.montantAE;
        this.form.patchValue({
          mandatForm: {
            montantCPChiffres: amount,
          },
        });
        return null;
      }
      if (
        this.form.getRawValue()?.mandatForm.typeMission ===
        this.translate.instant(EtatEngagementMandatEnum.CONTROLE)
      ) {
        const amount =
          (80 / 100) * this.form.getRawValue()?.engagementForm.montantAE;
        this.form.patchValue({
          mandatForm: {
            montantCPChiffres: amount,
          },
        });
        return null;
      }
      if (
        this.form.getRawValue()?.mandatForm.typeMission ===
        this.translate.instant(EtatEngagementMandatEnum.EFFECTUER)
      ) {
        const amount = this.form.getRawValue()?.engagementForm.montantAE;
        this.form.patchValue({
          mandatForm: {
            montantCPChiffres: amount,
          },
        });
        return null;
      }
      return error;
    }
    return null;
  };
}
