import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepLiquidation, TraitementBonEngagementModel } from '../../models/traitement-bon-engagement.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { ApisService } from '../../services/apis.service';
import { AppState } from '../../store/reducers/index';
import { Store } from '@ngrx/store';
import { DialogsService } from '../../services/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../base.component';
import { GetTransmissionsReceptionsDetails } from '../../store/actions/detail-transmissions-receptions.actions';
import { EtatBonEnum } from '../../utils/etat-bon-engagement.enum';
import { PieceJointeModel } from '@models/piece-jointe.model';

@Component({
  selector: 'app-create-traitement-liquidation-mandatement',
  templateUrl: './create-traitement-liquidation-mandatement.component.html',
  styleUrls: ['./create-traitement-liquidation-mandatement.component.scss']
})
export class CreateTraitementLiquidationMandatementComponent extends BaseComponent implements OnInit {
  public currentStepBs: BehaviorSubject<StepLiquidation> =
  new BehaviorSubject<StepLiquidation>('rubrique');
public currentStep$: Observable<StepLiquidation> =
  this.currentStepBs.asObservable();
  public form!: FormGroup;
  public data: any;
  public busy!: boolean;
  public test: string='';
  piecesJointe!: PieceJointeModel[]

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
        traitementLiquidationForm: this._fb.group({
          id: [undefined],
          dateLiquidation: [undefined],
          numOrdreLiquidation: [undefined],
          rubriqueLiquidation: [undefined],
          montantLiquidation: [undefined],
          liquidation: [undefined],
          dateOrdonnancement: [undefined],
          ordonnancement: [undefined],
          numOrdreOrdonnancement: [undefined],
          rubriqueOrdonnancement: [undefined],
          montantOrdonnancement: [undefined],
          bon: [undefined],
          piecesJointe: [undefined],
          action: [undefined],
          matriculeGestionnaire: [undefined],
          nomGestionnaire: [undefined],
          numeroBon: [undefined]

        }),
      });


      if (this.config.data?.item?.bon_engagement?.traitements[0]) {
        const {
          id,
          dateLiquidation,
          numOrdreLiquidation,
          rubriqueLiquidation,
          montantLiquidation,
          liquidation,
          piecesJointe,
          bon,
          action,
          dateOrdonnancement,
          ordonnancement,
          numOrdreOrdonnancement,
          rubriqueOrdonnancement,
          montantOrdonnancement,
          matriculeGestionnaire,
          nomGestionnaire,
          numeroBon

        } = this.config.data?.item?.bon_engagement?.traitements[0] as
          | TraitementBonEngagementModel
          | any
          this.data = this.config.data;
          console.log('item ',this.config.data?.item)
          console.log('action ',this.config.data?.action)
          if(this.config.data?.action !== 'enregistrer'){
            this.piecesJointe = JSON.parse(this.config.data?.item?.bon_engagement?.traitements[0]?.piecesJointe);
            this.test = JSON.stringify([1,2,3,4,5,6])
            console.log(this.test);
            console.log(JSON.parse(this.test));
            console.log('rubriqueLiquidation', JSON.parse(this.config.data?.item?.bon_engagement?.traitements[0]?.rubriqueLiquidation))
            console.log('pieceJointe', JSON.parse(this.config.data?.item?.bon_engagement?.traitements[0]?.piecesJointe))
          }
        this.form.patchValue({
          traitementLiquidationForm: {
            id,
            dateLiquidation,
            numOrdreLiquidation,
            rubriqueLiquidation,
            montantLiquidation,
            liquidation,
            piecesJointe,
            bon,
            action,
            dateOrdonnancement,
            ordonnancement,
            numOrdreOrdonnancement,
            rubriqueOrdonnancement,
            montantOrdonnancement,
            matriculeGestionnaire,
            nomGestionnaire,
            numeroBon
          },

        });
      }
  }

  get traitementLiquidationFormGroup(): FormGroup {
    return this.form?.get('traitementLiquidationForm') as FormGroup;
  }
  subformInitialized(name: string, group: FormGroup) {
    this.form.setControl(name, group);
  }
  changeStep(currentStep?: string, direction?: 'forward' | 'back') {
    switch (currentStep) {
      case 'rubrique':
        if (direction === 'forward') {
          if(this.data?.action === 'mandater') {
            this.currentStepBs.next('mandater');
          }else {
            this.currentStepBs.next('piece');
          }

        }
        break;
      case 'piece':
        if (direction === 'back') {
          this.currentStepBs.next('rubrique');
        }
        break;
      case 'mandater':
          if (direction === 'back') {
            this.currentStepBs.next('rubrique');
          }
          break;
    }
  }

  submitForm() {
    this.form.patchValue({
      traitementLiquidationForm: {
        action: this.config.data?.action,
      },
    });
    this.busy = true;
    const editedEngagement = {
      ...this.form.getRawValue()?.traitementLiquidationForm,
   } as TraitementBonEngagementModel;

   console.log('editedEngagement ', editedEngagement)

   if (this.data?.action === 'enregistrer') {
    const method: Observable<any> = this._apisService.post<TraitementBonEngagementModel>(
      '/traitement-bon-engagements',
      editedEngagement
    );
    method.subscribe(
      (res) => {
        this.busy = false;
        this.ref.close(res);
        this._store.dispatch(
          GetTransmissionsReceptionsDetails({ etats: [EtatBonEnum.RECEPTIONLIQUIDATION]})
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
  }

  if (this.data?.action !== 'enregistrer') {
    const method: Observable<any> = this._apisService.put<TraitementBonEngagementModel>(
      '/traitement-bon-engagements',
      editedEngagement
    );
    method.subscribe(
      (res) => {
        this.busy = false;
        this.ref.close(res);
        this._store.dispatch(
          GetTransmissionsReceptionsDetails({ etats: [EtatBonEnum.RECEPTIONLIQUIDATION]})
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
  }
  }

}
