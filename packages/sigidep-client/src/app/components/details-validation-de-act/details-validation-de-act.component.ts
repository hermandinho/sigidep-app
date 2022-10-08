import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppService } from '../../services/app.service';
import * as converter from 'number-to-words';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApisService } from '../../services/apis.service';
import { DialogsService } from '../../services/dialogs.service';

@Component({
  selector: 'app-details-validation-de-act',
  templateUrl: './details-validation-de-act.component.html',
  styleUrls: ['./details-validation-de-act.component.scss']
})
export class DetailsValidationDeACTComponent extends BaseComponent implements OnInit {
  @Input() bon!: any;
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
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
  'back' | 'forward'
>();
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder,
  ) {
    super()
  }

  ngOnInit() {
    console.log(this.config.data)
    this.form = this._fb.group({
      bon: [this.bon?.data ? this.bon?.data.bon_engagement : null],
      action: [this.bon?.data ? this.bon?.data.bon_engagement?.traitements[0].action : null],
      motif: [this.bon?.data ? this.bon?.data.bon_engagement?.motif : null],
      dateValidACT: [this.bon?.data ? this.bon?.data.bon_engagement?.paiements[0]?.dateValidACT : null],
      validACT: [this.bon?.data ? this.bon?.data.bon_engagement?.paiements[0]?.validACT : null],
      matriculeGestionnaire: [this.bon?.data ? this.bon?.data.bon_engagement?.traitements[0].matriculeGestionnaire : null],
      nomGestionnaire: [this.bon?.data ? this.bon?.data.bon_engagement?.traitements[0].nomGestionnaire : null],
      numeroMandat: [this.bon?.data ? this.bon?.data.bon_engagement?.traitements[0].numeroMandat : null],
    });
    this.form.controls['dateValidACT'].disable()
    this.data = this.bon?.bon_engagement;
    this.rubriques = JSON.parse(this.bon?.data.bon_engagement?.traitements[0]?.rubriqueLiquidation);
    this.montants = JSON.parse(this.bon?.data.bon_engagement?.traitements[0]?.montantLiquidation);

    for (let i = 0; i < this.montants.length; i++) {
      this.totalLiquidation += parseInt(this.montants[i]);
      console.log(this.totalLiquidation)
      this.montant_en_lettre = converter.toWords(this.totalLiquidation)
    }

    if(this.bon?.data?.bon_engagement?.paiements[0]?.validACT){
      this.observation = true
    }

    if(this.bon?.action === ''){
      this.observation = true
    }


    this.form.controls['matriculeGestionnaire'].disable()
    this.form.controls['numeroMandat'].disable()
    this.form.controls['nomGestionnaire'].disable()

    this.netAPayer_en_lettre = converter.toWords(this.montants[0]);
    this.montant_taxes = this.montants[2] ? this.montants[2] : 0 + this.montants[3] ? this.montants[3] : 0 + this.montants[4] ? this.montants[4] : 0
    this.montant_taxes_en_lettre = converter.toWords(this.montant_taxes);
  }
  get f() {
    return this.form.controls;
  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };
  close() {
    this.ref.close();
  }

}
