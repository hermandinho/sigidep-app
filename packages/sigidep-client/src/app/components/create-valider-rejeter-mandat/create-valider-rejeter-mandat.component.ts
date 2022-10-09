import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppService } from '../../services/app.service';
import * as converter from 'number-to-words';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetTransmissionsReceptionsDetails } from '../../store/actions/detail-transmissions-receptions.actions';
import { EtatBonEnum } from '../../utils/etat-bon-engagement.enum';
import { ApisService } from '../../services/apis.service';
import { DialogsService } from '../../services/dialogs.service';
import { DatePipe } from '@angular/common';
import { PaiementModel } from '../../models/paiement.model';

@Component({
  selector: 'app-create-valider-rejeter-mandat',
  templateUrl: './create-valider-rejeter-mandat.component.html',
  styleUrls: ['./create-valider-rejeter-mandat.component.scss']
})
export class CreateValiderRejeterMandatComponent extends BaseComponent implements OnInit {
  rubriques: any[] = [];
  montants: any[] = [];
  public busy!: boolean;
  data!: any;
  totalLiquidation = 0;
  montant_en_lettre: string = '';
  public form!: FormGroup;
  observation: boolean = false;
  netAPayer_en_lettre = '';
  montant_taxes = 0;
  montant_taxes_en_lettre = '';
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
    console.log(this.config.data)
    this.form = this._fb.group({
      bon: [this.config.data.item.data ? this.config.data.item.data : null],
      action: [this.config.data.item.data ? this.config.data.item.data?.traitements[0].action : null],
      motif: [this.config.data.item.data ? this.config.data.item.data?.motif : null],
      dateValidACT: [this.config.data.item.data ? this.config.data.item.data?.paiements[0]?.dateValidACT : null],
      validACT: [this.config.data.item.data ? this.config.data.item.data?.paiements[0]?.validACT : null],
      matriculeGestionnaire: [this.config.data.item.data ? this.config.data.item.data?.traitements[0].matriculeGestionnaire : null],
      nomGestionnaire: [this.config.data.item.data ? this.config.data.item.data?.traitements[0].nomGestionnaire : null],
      numeroMandat: [this.config.data.item.data ? this.config.data.item.data?.traitements[0].numeroMandat : null],
    });
    this.form.controls['dateValidACT'].disable()
    this.data = this.config.data?.item;
    this.rubriques = JSON.parse(this.config.data?.item?.data?.traitements[0]?.rubriqueLiquidation);
    this.montants = JSON.parse(this.config.data?.item?.data?.traitements[0]?.montantLiquidation);

    for (let i = 0; i < this.montants?.length; i++) {
      this.totalLiquidation += parseInt(this.montants[i]);
      console.log(this.totalLiquidation)
      this.montant_en_lettre = converter.toWords(this.totalLiquidation)
    }

    if(this.config.data.item.data?.paiements[0]?.validACT){
      this.observation = true
    }

    if(this.config.data.item.action === ''){
      this.observation = true
    }


    this.form.controls['matriculeGestionnaire'].disable()
    this.form.controls['numeroMandat'].disable()
    this.form.controls['nomGestionnaire'].disable()

    this.netAPayer_en_lettre = converter.toWords(this.montants ? this.montants[0] : 0);
    this.montant_taxes = this.montants ? (this.montants[2] ? this.montants[2] : 0 + this.montants[3] ? this.montants[3] : 0 + this.montants[4] ? this.montants[4] : 0) : 0
    this.montant_taxes_en_lettre = converter.toWords(this.montant_taxes);
  }
  get f() {
    return this.form.controls;
  }

  onObservation(event: any, elt: string) {
    const pipe = new DatePipe('en-US');
    const date = new Date();
    const currentDate = pipe.transform(date, 'yyyy-MM-dd');
    if (this.f.validACT.value === true) {
      this.form.patchValue({
        dateValidACT: currentDate
      })
      this.observation = true

    } else {
      this.observation = false
    }

  }

  submitForm() {
    this.form.patchValue({
      action: 'controle-regulariter',
    });
    this.busy = true;
    const editedPaiement = {
      ...this.form.getRawValue(),
    } as PaiementModel;

    console.log('editedPaiement ', editedPaiement)

    const method: Observable<any> = this._apisService.post<PaiementModel>(
      '/paiements',
      editedPaiement
    );
    method.subscribe(
      (res) => {
        this.busy = false;
        this.ref.close(res);
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

  submitRejetForm() {
    this.form.patchValue({
      action: 'rejeter-mandat',
    });
    this.busy = true;
    const editedPaiement = {
      ...this.form.getRawValue(),
    } as PaiementModel;
    this._dialogService.launchMotifRejetCreateDialog(
      editedPaiement,
    );
    this.ref.close();
  }
}
