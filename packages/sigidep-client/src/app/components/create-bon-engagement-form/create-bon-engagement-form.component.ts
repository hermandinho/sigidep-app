import { GetBonsEngagements } from '@actions/bons-engagements.actions';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import {
  BonEngagementModel,
  EtatBonEngagementEnum,
  StepBonEngagement,
} from '@models/bon-engagement.model';
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
  selector: 'app-create-bon-engagement-form',
  templateUrl: './create-bon-engagement-form.component.html',
  styleUrls: ['./create-bon-engagement-form.component.scss'],
})
export class CreateBonEngagementFormComponent
  extends BaseComponent
  implements OnInit
{
  public currentStepBs: BehaviorSubject<StepBonEngagement> =
    new BehaviorSubject<StepBonEngagement>('engagement');
  public currentStep$: Observable<StepBonEngagement> =
    this.currentStepBs.asObservable();
  public form!: FormGroup;
  public action!: 'book' | 'edit';
  public situationAction!: string;
  public busy = false;
  public currentProcedure!: string;
  public categorieProcedure!: CategorieProcedure;
  public engagements!: any;
  public situations: any;
  public isCheck = false;
  public situationForm: any;
  //bookProcess:any;
  public editedEngagement!: BonEngagementModel;

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
            id: [null],
          },
          null
        ),
        montantAE: [undefined],
        netAPercevoir: [undefined],
        nomUnitAdminBenef: [undefined],
        codeUnitAdminBenef: [undefined],
        montantIRNC: [undefined],
        montantBrut: [undefined],
        numContribuable: [undefined],
        raisonSociale: [undefined],
        taxesApplicable: this._fb.group({
          id: '',
          code: '',
          label: '',
          TxTVA: [{ value: '', disabled: true }],
          TxIR: [{ value: '', disabled: true }],
        }),
        tauxTVA: [undefined],
        tauxIR: [undefined],
        RIB: [undefined],
      }),
      bonEngagementForm: this._fb.group({
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
        typeMarche: [undefined],
      }),

      performForm: this._fb.group({
        livrables: [undefined],
        situationActuelle: [undefined],
        sourceVerif: [undefined],
      }),
      factureForm: this._fb.group({
        id: [undefined],
        date: [undefined],
        reference: [undefined],
        objet: [undefined],
        tauxTVA: [undefined],
        tauxIR: [undefined],
        montantHT: [undefined],
        montantTVA: [undefined],
        montantIR: [undefined],
        montantTotalHT: [undefined],
        netAPercevoir: [undefined],
        montantTTC: [undefined],
        articles: this._fb.array([]),
      }),
    });

    if (this.config.data?.category) {
      this.categorieProcedure = this.config.data?.category;
    }

    if (this.config.data?.action) {
      this.action = this.config.data?.action;
      this.situationAction = this.config.data?.action;
      if (this.situationAction === 'dialogs.headers.etatBonEngagement') {
        this.engagements = this.config.data?.item;
        this.isCheck = true;
        this.currentStepBs.next('situation');
      } else if (this.situationAction === 'dialogs.headers.etatCertificat') {
        this.engagements = this.config.data?.item;
      }
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
        nomUnitAdminBenef,
        codeUnitAdminBenef,
        montantIRNC,
        montantBrut,
        numContribuable,
        raisonSociale,
        taxesApplicable,
        tauxTVA,
        tauxIR,
        RIB,
        typeMarche,
        facture,
      } = this.config.data?.item as
        | EngagementMissionModel
        | BonEngagementModel
        | any;
      this.currentProcedure =
        this.config?.data?.item?.numActeJuridique?.codeProcedure;
      this._appService.setCurrentProcedure(this.currentProcedure);

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
          nomUnitAdminBenef,
          codeUnitAdminBenef,
          montantIRNC,
          montantBrut,
          numContribuable,
          raisonSociale,
          taxesApplicable,
          tauxTVA,
          tauxIR,
          RIB,
        },
        bonEngagementForm: {
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
          typeMarche,
        },
        performForm: {
          livrables,
          situationActuelle,
          sourceVerif,
        },
        situationForm: {},
        factureForm: {
          id: facture?.id,
          date: facture?.date,
          reference: facture?.reference,
          objet: facture?.objet,
          tauxTVA: facture?.tauxTVA,
          tauxIR: facture?.tauxIR,
          montantHT: facture?.montantHT,
          montantTVA: facture?.montantTVA,
          montantIR: facture?.montantIR,
          montantTotalHT: facture?.montantHT,
          netAPercevoir: facture?.netAPercevoir,
          montantTTC: facture?.montantTTC,
          articles: facture?.articles,
        },
      });
    }
  }

  get situationFormGroup(): FormGroup {
    return this.form?.get('situationForm') as FormGroup;
  }

  get engagementFormGroup(): FormGroup {
    return this.form?.get('engagementForm') as FormGroup;
  }
  get bonEngagementFormGroup(): FormGroup {
    return this.form?.get('bonEngagementForm') as FormGroup;
  }

  get performFormGroup(): FormGroup {
    return this.form?.get('performForm') as FormGroup;
  }
  get factureFormGroup(): FormGroup {
    return this.form?.get('factureForm') as FormGroup;
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
      case 'situation':
        if (direction === 'forward') {
          this.currentStepBs.next('engagement');
        }
        break;
      case 'engagement':
        if (direction === 'forward') {
          this.currentStepBs.next('bon');
        }
        if (direction === 'back') {
          this.currentStepBs.next('situation');
        }
        break;
      case 'bon':
        if (direction === 'forward') {
          this.currentStepBs.next('perform');
        }
        if (direction === 'back') {
          this.currentStepBs.next('engagement');
        }
        break;
      case 'perform':
        if (direction === 'back') {
          this.currentStepBs.next('bon');
        }

        if (direction === 'forward') {
          this.currentStepBs.next('facture');
        }
        break;

      case 'facture':
        if (direction === 'back') {
          this.currentStepBs.next('perform');
        }
        break;
    }
  }
  bookProcess = (engagement: BonEngagementModel) => {
    const method: Observable<any> = this._apisService.put<BonEngagementModel>(
      '/bons-engagements/reservation',
      engagement
    );

    method.subscribe(
      (res) => {
        //this.busy = false;
        this.ref.close(res);
        this._store.dispatch(
          GetBonsEngagements({ procedures: [res?.codeProcedure] })
        );
        this._dialogService.launchPrintBonEngagementPrimeDialog(res);
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
    if(this.form.getRawValue()?.engagementForm?.codeProcedure=='1122' || this.form.getRawValue()?.engagementForm?.codeProcedure=='1123' || this.form.getRawValue()?.engagementForm?.codeProcedure=='1124'){
      this.form.patchValue({
        bonEngagementForm: {
          matriculeGestionnaire: this.form.getRawValue()?.engagementForm.matriculeBeneficaire,
          nomGestionnaire: this.form.getRawValue()?.engagementForm.nomBeneficaire
        },
      });
    }else if(this.form.getRawValue()?.engagementForm?.codeProcedure=='1125'){
      this.form.patchValue({
        bonEngagementForm: {
          matriculeGestionnaire: this.form.getRawValue()?.engagementForm.codeUnitAdminBenef,
          nomGestionnaire: this.form.getRawValue()?.engagementForm.nomUnitAdminBenef
        },
      });
    }else if(this.form.getRawValue()?.engagementForm?.codeProcedure=='1126'){
      this.form.patchValue({
        bonEngagementForm: {
          matriculeGestionnaire: this.form.getRawValue()?.engagementForm.numContribuable,
        },
      });
    }

    if(this.form.getRawValue()?.engagementForm?.codeProcedure=='1110' || this.form.getRawValue()?.engagementForm?.codeProcedure=='1111' || this.form.getRawValue()?.engagementForm?.codeProcedure=='1115'){
      this.editedEngagement = {
        ...this.form.getRawValue()?.engagementForm,
        ...this.form.getRawValue().bonEngagementForm,
        ...this.form.getRawValue().performForm,

        facture: { ...this.form.getRawValue().factureForm },
      } as BonEngagementModel;
    }else{
      this.editedEngagement = {
        ...this.form.getRawValue()?.engagementForm,
        ...this.form.getRawValue().bonEngagementForm,
        ...this.form.getRawValue().performForm,
      } as BonEngagementModel;
    }

    console.log(this.editedEngagement)
    console.log('..............FORMM.....', {
      ...this.form.getRawValue().factureForm,
    });
    if (this.isBook) {
      this.bookProcess(this.editedEngagement);
      localStorage.removeItem('imputation');
      this.ref.close();
    }

    if (!this.isBook && this.isUpdateForm) {
      const method: Observable<any> = this._apisService.put<BonEngagementModel>(
        '/bons-engagements',
        this.editedEngagement
      );
      method.subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          localStorage.removeItem('imputation');
          this._store.dispatch(
            GetBonsEngagements({ procedures: [res?.codeProcedure] })
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
        message: 'dialogs.messages.saveBon',
        accept: () => {
          const method: Observable<any> =
            this._apisService.post<BonEngagementModel>(
              '/bons-engagements',
              this.editedEngagement
            );
          method.subscribe(
            (res) => {
              this.busy = false;

              localStorage.removeItem('imputation');
              this._store.dispatch(
                GetBonsEngagements({ procedures: [res?.codeProcedure] })
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
    if (!this.isUpdateForm && control.value) {
      const date = moment(control.value);
      const currentDate = moment(
        this.form.getRawValue()?.bonEngagementForm.dateAffectation
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
        this.form.getRawValue()?.bonEngagementForm.typeMission ===
        this.translate.instant(EtatBonEngagementEnum.ORDINAIRE)
      ) {
        const amount =
          (75 / 100) * this.form.getRawValue()?.engagementForm.montantAE;
        this.form.patchValue({
          bonEngagementForm: {
            montantCPChiffres: amount,
          },
        });
        return null;
      }
      if (
        this.form.getRawValue()?.bonEngagementForm.typeMission ===
        this.translate.instant(EtatBonEngagementEnum.CONTROLE)
      ) {
        const amount =
          (80 / 100) * this.form.getRawValue()?.engagementForm.montantAE;
        this.form.patchValue({
          bonEngagementForm: {
            montantCPChiffres: amount,
          },
        });
        return null;
      }
      if (
        this.form.getRawValue()?.bonEngagementForm.typeMission ===
        this.translate.instant(EtatBonEngagementEnum.EFFECTUER)
      ) {
        const amount = this.form.getRawValue()?.engagementForm.montantAE;
        this.form.patchValue({
          bonEngagementForm: {
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
