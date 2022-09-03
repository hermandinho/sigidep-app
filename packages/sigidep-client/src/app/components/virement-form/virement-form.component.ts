import { GetVirement } from '@actions/virement.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@components/base.component';
import { DetailsVirementModel } from '@models/detailsVirement';
import { EncoursModel } from '@models/encours.model';
import { StepVirement, VirementModele } from '@models/virement.model';
import { Store } from '@ngrx/store';
import { ModeVirementEnum } from '@pages/virements/tools/virement-tools';
import { AppState } from '@reducers/index';
import { ApisService } from '@services/apis.service';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-virement-form',
  templateUrl: './virement-form.component.html',
  styleUrls: ['./virement-form.component.scss']
})
export class VirementFormComponent extends BaseComponent implements OnInit {
  public currentStepBs: BehaviorSubject<StepVirement> = new BehaviorSubject<StepVirement>('virement');
  public currentStep$: Observable<StepVirement> = this.currentStepBs.asObservable();
  public form!: FormGroup;
  public validationForm!: FormGroup;
  public action!: 'save' | 'edit' | 'book' | 'valid' | 'cancel';
  public situationAction!: string;
  public busy = false;
  public currentVirement!: string;
  public engagements!: any;
  public situations: any;
  public isCheck = false;
  public situationForm: any;
  public encourData: EncoursModel[] = [];
  public detailsVirements: DetailsVirementModel[] = [];
  public oldDetailsVirements: DetailsVirementModel[] = [];
  public subProgrameSource: any = '####';
  public subProgrameCible: any = '####';
  public mode!: ModeVirementEnum;
  public virement?: VirementModele;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    private _dialogService: DialogsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.mode = this.config.data?.mode as ModeVirementEnum;
    if (this.mode != ModeVirementEnum.CREATION) {
      this.virement = this.config.data?.item as VirementModele;
      this.oldDetailsVirements = this.virement.detailsVirements;
      this.form = this._fb.group({
        exercice: this.virement.exercice,
        spCibleVirement: this.virement.spCibleVirement,
        spSourceVirement: this.virement.spSourceVirement,
        validSource: false,
        validCible: false,
        typeVirement: this.virement.typeVirement,
        modelVirement: this.virement.modelVirement,
        dateVirement: this.virement.dateVirement,
        objectVirement: this.virement.objectVirement,
        detailsVirementsDebit: [],
        detailsVirementsCredit: []
      });
      if (this.mode == ModeVirementEnum.UPDATED) {
        this.getEncour(this.virement.exercice.code);
      }
      if (this.mode == ModeVirementEnum.VALIDATION) {
        this.validationForm = this._fb.group({
          virement: this.virement,
          signataireVirement: [undefined, [Validators.required]],
          dateSignatureVirement: [undefined, [Validators.required]],
          reference: [undefined, [Validators.required]],
        });
      }
    } else {
      this.form = this._fb.group({
        exercice: [undefined, [Validators.required]],
        spCibleVirement: [undefined, [Validators.required]],
        spSourceVirement: [undefined, [Validators.required]],
        typeVirement: [undefined, [Validators.required]],
        modelVirement: [undefined, [Validators.required]],
        dateVirement: [undefined, [Validators.required]],
        objectVirement: [undefined, [Validators.required]],
        detailsVirementsDebit: [undefined],
        detailsVirementsCredit: [undefined]
      });
    }
  }


  get virementBodyForm(): FormGroup {
    return this.form as FormGroup;
  }

  get validationFormBody(): FormGroup {
    return this.validationForm as FormGroup;
  }


  async getEncour(code: number) {
    const encourResult = await this._apisService
      .get<EncoursModel[]>(`/virements/encour/${code}`) // TODO: reutiliser la ligne suivante
      .toPromise();
    this.detailsVirements = [];
    encourResult.forEach((e) => {
      this.detailsVirements.push(
        new DetailsVirementModel({
          codeInput: e.imputation,
          libelleInput: e.operation.labelFr,
          encour: e,
          typeVirement: e.sourceFinancement,
        })
      );
    });
  }

  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
  }


  changeStep(currentStep?: string, direction?: 'forward' | 'back') {
    switch (currentStep) {
      case 'virement':
        if (direction === 'forward') {
          this.currentStepBs.next('details-virement');
        }
        break;
      case 'details-virement':
        if (direction === 'forward') {
          this.currentStepBs.next('validation-virement');
        }
        if (direction === 'back') {
          this.currentStepBs.next('virement');
        }
        break;
      case 'validation-virement':
        if (direction === 'back') {
          this.currentStepBs.next('details-virement');
        }
        break;
    }
  }

  submit() {
    const virement = {
      ...this.form.value,
    } as VirementModele;
    this._apisService
      .post<VirementModele>('/virements', virement)
      .subscribe(
        (res) => {
          this.busy = false;
          this._dialogService.launchVirementMessage({ numero: res.numero ?? '', title: 'virement de credit enregistré sous le numero' })
          this.ref.close(res);
          this._appService.showToast({
            summary: 'message.success',
            detail: 'messages.virement.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
          this._store.dispatch(GetVirement());
        },
        ({ error }) => {
          this.busy = false;
          this.ref.close();
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.dejaRegion';
          } else {
            err = 'errors.unknown';
          }
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

  updateData() {
    const virement = {
      ...this.form.value,
    } as VirementModele;
    virement.id = this.virement?.id ?? -1;

    this._apisService
      .post<VirementModele>('/virements/update', virement)
      .subscribe(
        (res) => {
          this.busy = false;
          this._dialogService.launchVirementMessage({ numero: this.virement?.numero ?? '', title: 'Modification du virement N°', subtitle: 'effectué avec success!' }, 25)
          this.ref.close(res);
          this._appService.showToast({
            summary: 'message.success',
            detail: 'messages.virement.createSuccess',
            severity: 'success',
            life: 3000,
            closable: true,
          });
          this._store.dispatch(GetVirement());
        },
        ({ error }) => {
          this.busy = false;
          this.ref.close();
          let err = '';
          if (error?.statusCode === 409) {
            err = 'errors.dejaRegion';
          } else {
            err = 'errors.unknown';
          }
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
