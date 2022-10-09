import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Observable, of } from 'rxjs';
import { GetEngagementJuridiquesByCategory } from '../../store/actions/engagements.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppService } from '../../services/app.service';
import * as converter from 'number-to-words';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TraitementBonEngagementModel } from '../../models/traitement-bon-engagement.model';
import { GetTransmissionsReceptionsDetails } from '../../store/actions/detail-transmissions-receptions.actions';
import { EtatBonEnum } from '../../utils/etat-bon-engagement.enum';
import { ApisService } from '../../services/apis.service';
import { DialogsService } from '../../services/dialogs.service';

@Component({
  selector: 'app-decision-controle-regularite',
  templateUrl: './decision-controle-regularite.component.html',
  styleUrls: ['./decision-controle-regularite.component.scss']
})
export class DecisionControleRegulariteComponent extends BaseComponent implements OnInit {
  rubriques: any[] = [];
  montants: any[] = [];
  public busy!: boolean;
  data!: any;
  totalLiquidation = 0;
  montant_en_lettre: string = '';
  public form!: FormGroup;
  observation: boolean = false;
  constructor(
    private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _apisService: ApisService,
    private readonly _dialogService: DialogsService,

  ) {
    super()
  }

  ngOnInit() {
    console.log(this.config.data.item)
    this.form = this._fb.group({
      id: [this.config.data.item.traitements.length > 0 ? this.config.data.item?.traitements[0].id : null],
      dateLiquidation: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].dateLiquidation : null],
      numOrdreLiquidation: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].numOrdreLiquidation : null],
      rubriqueLiquidation: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].rubriqueLiquidation : null],
      montantLiquidation: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].montantLiquidation : null],
      liquidation: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].liquidation : null],
      dateOrdonnancement: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].dateOrdonnancement : null],
      ordonnancement: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].ordonnancement : null],
      numOrdreOrdonnancement: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].numOrdreOrdonnancement : null],
      rubriqueOrdonnancement: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].rubriqueOrdonnancement : null],
      montantOrdonnancement: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].montantOrdonnancement : null],
      bon: [this.config.data.item ? this.config.data.item : null],
      piecesJointe: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].piecesJointe : null],
      action: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].action : null],
      matriculeGestionnaire: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].matriculeGestionnaire : null],
      nomGestionnaire: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].nomGestionnaire : null],
      numeroMandat: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].numeroMandat : null],
      DecisionControleRegularite: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].DecisionControleRegularite : null],
      motifRejetRegulariter: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].motifRejetRegulariter : null],
      observation: [this.config.data.item?.traitements.length > 0 ? this.config.data.item?.traitements[0].observation : null]
    });

    this.data = this.config.data?.item;
    this.rubriques = JSON.parse(this.config.data.item?.traitements.length > 0 ? this.config.data?.item?.traitements[0]?.rubriqueLiquidation : '');
    this.montants = JSON.parse(this.config.data.item?.traitements.length > 0 ? this.config.data?.item?.traitements[0]?.montantLiquidation : '');
    console.log('rubriqueLiquidation', JSON.parse(this.config.data.item?.traitements.length > 0 ? this.config.data?.item?.traitements[0]?.rubriqueLiquidation : ''))

    for (let i = 0; i < this.montants.length; i++) {
      this.totalLiquidation += parseInt(this.montants[i]);
      console.log(this.totalLiquidation)
      this.montant_en_lettre = converter.toWords(this.totalLiquidation)
    }

    this.form.controls['matriculeGestionnaire'].disable()
    this.form.controls['numeroMandat'].disable()
    this.form.controls['nomGestionnaire'].disable()
    if(this.config.data?.action === 'rejet'){
      this.form.controls['observation'].disable()
    }

  }

  onObservation(event: any, elt: string) {
    if (elt === 'observation') {
      this.form.controls['observation'].enable()
      this.observation = true
      this.form.patchValue({
        DecisionControleRegularite: 'Valider avec observation',
        observation: ''
      });

    } else {
      this.form.controls['observation'].disable()
      this.observation = true
      this.form.patchValue({
        DecisionControleRegularite: 'Valider',
        observation: 'RAS'
      });
    }

  }
  handleControler(item: any) {


  }
  submitForm() {
/*     this._appService.showConfirmation({
      message: 'dialogs.messages.controleBonRegularite',
      accept: () => { */

        this.form.patchValue({
          action: 'controle-regulariter',
        });
        this.busy = true;
        const editedEngagement = {
          ...this.form.getRawValue(),
        } as TraitementBonEngagementModel;

        console.log('editedEngagement ', editedEngagement)

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
                GetTransmissionsReceptionsDetails({ etats: [EtatBonEnum.RECEPTIONLIQUIDATION] })
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

  submitRejetForm() {
    this.form.patchValue({
      action: 'rejet-controle-regulariter',
    });
    this.busy = true;
    const editedEngagement = {
      ...this.form.getRawValue(),
    } as TraitementBonEngagementModel;
    this._dialogService.launchMotifRejetCreateDialog(
      editedEngagement,
    );
    this.ref.close();
  }
}
