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

@Component({
  selector: 'app-create-bon-engagement-mission-form',
  templateUrl: './create-bon-engagement-mission-form.component.html',
  styleUrls: ['./create-bon-engagement-mission-form.component.scss'],
})
export class CreateBonEngagementMissionFormComponent
  extends BaseComponent
  implements OnInit
{
  public currentStepBs: BehaviorSubject<StepBonEngagement> =
    new BehaviorSubject<StepBonEngagement>('engagement');
  public currentStep$: Observable<StepBonEngagement> =
    this.currentStepBs.asObservable();
  public form!: FormGroup;
  public action!: 'book' | 'edit';
  public busy = false;
  //bookProcess:any;
  public data: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public _fb: FormBuilder,
    public _appService: AppService,
    public _apisService: ApisService,
    public _store: Store<AppState>,
    public readonly _dialogService: DialogsService,
    public translate: TranslateService
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
            numero: [null],
            imputation: [null],
          },
          null
        ),
        montantAE: [undefined],
      }),
      bonEngagementForm: this._fb.group({
        numero: [undefined],
        matriculeGestionnaire: [undefined],
        nomGestionnaire: [undefined],
        objet: [undefined],
        dateEngagement: [undefined, [Validators.required, this.dateValidator]],
        montantCPChiffres: [undefined,],
        montantCPLettres: [undefined],
        signataire: [undefined],
        typeMission: [undefined,],
        dateAffectation: [undefined],
      }),

      performForm: this._fb.group({
        livrables: [undefined],
        situationActuelle: [undefined],
        sourceVerif: [undefined],
      }),
    });

    if (this.config.data?.action) {
      this.action = this.config.data?.action;
      this.data = this.config.data?.item;
    }

    if (this.data) {
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
      } = this.data as EngagementMissionModel | BonEngagementModel | any;
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
  get bonEngagementFormGroup(): FormGroup {
    return this.form?.get('bonEngagementForm') as FormGroup;
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
  }

  changeStep(currentStep: string, direction: 'forward' | 'back') {
    switch (currentStep) {
      case 'engagement':
        if (direction === 'forward') {
          this.currentStepBs.next('bon');
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
        this._store.dispatch(GetBonsEngagements({}));
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
    this.busy = true;
    let editedEngagement: BonEngagementModel;
    editedEngagement = {
      ...this.form.getRawValue()?.engagementForm,
      ...this.form.getRawValue().bonEngagementForm,
      ...this.form.getRawValue().performForm,
    } as BonEngagementModel;

    if (this.isBook) {
      this.bookProcess(editedEngagement);
      this.ref.close();
    }

    if (!this.isBook && this.isUpdateForm) {
      const method: Observable<any> = this._apisService.put<BonEngagementModel>(
        '/bons-engagements',
        editedEngagement
      );
      method.subscribe(
        (res) => {
          this.busy = false;
          this.ref.close(res);
          localStorage.removeItem('imputation');
          this._store.dispatch(GetBonsEngagements({procedures:['1121']}));
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
            this._apisService.post<BonEngagementModel>(
              '/bons-engagements',
              editedEngagement
            );
          method.subscribe(
            (res) => {
              this.busy = false;

              localStorage.removeItem('imputation');
              this._store.dispatch(GetBonsEngagements({procedures:['1121']}));

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