import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppService } from '../../services/app.service';
import { ApisService } from '../../services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DialogsService } from '../../services/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { PaiementModel, StepPaiement } from '../../models/paiement.model';
import { GetTransmissionsReceptionsDetails } from '../../store/actions/detail-transmissions-receptions.actions';
import { EtatBonEnum } from '../../utils/etat-bon-engagement.enum';

@Component({
  selector: 'app-create-payer-mandat',
  templateUrl: './create-payer-mandat.component.html',
  styleUrls: ['./create-payer-mandat.component.scss']
})
export class CreatePayerMandatComponent extends BaseComponent implements OnInit {
  public currentStepBs: BehaviorSubject<StepPaiement> =
    new BehaviorSubject<StepPaiement>('validation');
  public currentStep$: Observable<StepPaiement> =
    this.currentStepBs.asObservable();
  public form!: FormGroup;
  public action!: 'book' | 'edit';
  public busy = false;
  public data: any;
  public paiement: any;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private _store: Store<AppState>,
    private readonly _dialogService: DialogsService,
    private translate: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    console.log(this.config.data.item)
    this.data = this.config.data.item
    this.form = this._fb.group({
      paiementForm: this._fb.group({
        id: [undefined],
        modePaiement: [undefined],
        dateValidACT: [undefined],
        compteADebiter: [undefined],
        bon: [undefined],
        compteACrediter: [undefined],
        datePaiement: [undefined],
        villePaiement: [undefined],
        paye: [undefined],
        validACT: [undefined],
        action: [undefined],
        numeroPaiement: [undefined],
        numeroCNI: [undefined],
        dateDelivrance: [undefined],
        lieuDelivrance: [undefined]
      })
    });


    if (this.config.data?.item) {
      const {
        id,
        modePaiement,
        dateValidACT,
        compteADebiter,
        bon,
        compteACrediter,
        datePaiement,
        villePaiement,
        paye,
        validACT,
        action,
        numeroPaiement,
        numeroCNI,
        dateDelivrance,
        lieuDelivrance
      } = this.config.data?.item?.data?.bon_engagement?.paiements[0] as
        | PaiementModel
        | any;
      this.paiement = this.config.data?.item?.data?.bon_engagement?.paiements[0]
      this.form.patchValue({
        paiementForm: {
          id,
          modePaiement,
          dateValidACT,
          compteADebiter,
          bon,
          compteACrediter,
          datePaiement,
          villePaiement,
          paye,
          validACT,
          action,
          numeroPaiement,
          numeroCNI,
          dateDelivrance,
          lieuDelivrance
        }
      });
    }
  }
  get paiementFormGroup(): FormGroup {
    return this.form?.get('paiementForm') as FormGroup;
  }

  get isBook() {
    return this.action === 'book';
  }

  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
  }

  changeStep(currentStep?: string, direction?: 'forward' | 'back') {
    switch (currentStep) {
      case 'validation':
        if (direction === 'forward') {
          this.currentStepBs.next('paiement');
        }
        break;
      case 'paiement':
        if (direction === 'back') {
          this.currentStepBs.next('validation');
        }
        break;
    }
  }

  submitForm() {
    this.form.patchValue({
      paiementForm:{
        action: 'payer-mandat',
      }

    });
    this.busy = true;
    const editedPaiement = {
      ...this.form.getRawValue(),
    } as any;
    console.log('editedPaiement ', editedPaiement.paiementForm)

    const method: Observable<any> = this._apisService.put<PaiementModel>(
      '/paiements',
      editedPaiement.paiementForm
    );
    method.subscribe(
      (res) => {
        this.busy = false;
        this.ref.close(res);
        this._dialogService.launchFichePaiementComponentDialog(
          res,
        );
        this._store.dispatch(
          GetTransmissionsReceptionsDetails({ etats: [EtatBonEnum.RECEPTIONACT] })
        );
        this._appService.showToast({
          summary: 'messages.success',
          detail: 'messages.validation.createSuccess',
          severity: 'success',
          life: 3000,
          closable: true,
        });
      },
      ({ error }) => {
        let err = '';
        if (error?.statusCode === 409) {
          err = 'errors.validation.notfound';
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
