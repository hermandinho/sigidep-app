import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../base.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '../../services/app.service';
import { GetEngagementJuridiquesByCategory } from '../../store/actions/engagements.actions';
import { EngagementCommandeModel } from '../../models/engagement-commande.model';
import { EngagementDecisionModel } from '../../models/engagement-decision.model';
import { EngagementMissionModel } from '../../models/engagement-mission.model';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/engagements.reducer';
import { DatePipe } from '@angular/common';
import { BonEngagementModel } from '../../models/bon-engagement.model';

@Component({
  selector: 'app-rubrique-liquider-form',
  templateUrl: './rubrique-liquider-form.component.html',
  styleUrls: ['./rubrique-liquider-form.component.scss']
})
export class RubriqueLiquiderFormComponent extends BaseComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Input() data: any;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<'back' | 'forward'> = new EventEmitter<
    'back' | 'forward'
  >();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  public traitementLiquidationForm!: FormGroup;
  public engagements!: (
    | EngagementCommandeModel
    | EngagementDecisionModel
    | EngagementMissionModel
  )[];

  rubrique: string[] = [];
  montant: number[] = [];
  dataRubrique: any;
  loading$: Observable<boolean> = of(true);
  netAPercevoir!:number;
  montantHT:number = 0;
  montantTVA:number = 0;
  montantIR:number = 0;
  montantIRNC:number = 0;
  somme = 0;
  constructor(
    private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    private _appService: AppService
  ) {
    super()
    this._initListeners();
  }

  ngOnInit() {

    //this.getData();
    console.log('item ',this.data)
    if(this.data?.item?.numActeJuridique?.codeProcedure === '1121'){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'mission'
        })
      );
    }
    if(this.data?.item?.numActeJuridique?.codeProcedure==='1122'||this.data?.item?.numActeJuridique?.codeProcedure==='1123'||this.data?.item?.numActeJuridique?.codeProcedure==='1124'||this.data?.item?.numActeJuridique?.codeProcedure==='1125'||this.data?.item?.numActeJuridique?.codeProcedure==='1126'){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'decision'
        })
      );
    }

    if(this.data?.item?.numActeJuridique?.codeProcedure==='1110'||this.data?.item?.numActeJuridique?.codeProcedure==='1111'||this.data?.item?.numActeJuridique?.codeProcedure==='1115'){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'commande'
        })
      );
    }

    this.traitementLiquidationForm = this.startingForm;
    console.log('traitementLiquidationForm',this.traitementLiquidationForm)
    this.subformInitialized.emit(this.traitementLiquidationForm);
    //if (this.readOnly) this.engagementForm.disable();

  }

  doChangeStep = (direction: any) => {
    this.setTraitementForm();
    this.changeStep.emit(direction);
  };

  private async _initListeners() {
    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelector))
    .subscribe((data) => {
      this.engagements = [...data];
      console.log(this.engagements)
        if(this.data?.item?.numActeJuridique?.codeProcedure === '1121'){
          this.dataRubrique = this.engagements.find(
            (item:any) => item.id === this.data?.item?.numActeJuridique?.id
          );
          this.rubrique.push('Net à payer');
          this.montant.push(this.dataRubrique?.moment)
          this.netAPercevoir = this.dataRubrique?.moment
          console.log('mission ',this.dataRubrique)
          this.somme = (this.netAPercevoir ? this.netAPercevoir : 0) +(this.montantTVA ? this.montantTVA : 0)+(this.montantIR ? this.montantIR : 0)+(this.montantIRNC ? this.montantIRNC : 0);
          console.log('somme ',this.somme)
        }
        if(this.data?.item?.numActeJuridique?.codeProcedure==='1122'||this.data?.item?.numActeJuridique?.codeProcedure==='1123'||this.data?.item?.numActeJuridique?.codeProcedure==='1124'||this.data?.item?.numActeJuridique?.codeProcedure==='1125'||this.data?.item?.numActeJuridique?.codeProcedure==='1126'){
          this.dataRubrique = this.engagements.find(
            (item:any) => item.id === this.data?.item?.numActeJuridique?.id
          );
          console.log(this.dataRubrique)
          if(this.dataRubrique?.netAPercevoir !== null){
            this.rubrique.push('Net à payer');
            this.montant.push(this.dataRubrique?.netAPercevoir)
            this.netAPercevoir = this.dataRubrique?.netAPercevoir
          }
          if(this.data?.item?.numActeJuridique?.codeProcedure==='1122'){
            this.rubrique.push('Montant IRNC');
            this.montant.push(this.dataRubrique?.montantIRNC);
            this.montantIRNC = this.dataRubrique?.montantIRNC
          }

          if(this.dataRubrique?.codeProcedure === '1126'){
              //Montant HT
              if(this.dataRubrique?.montantBrut !== null){
                this.rubrique.push('Montant HT');
                this.montant.push(this.dataRubrique?.montantBrut);
                this.montantHT = this.dataRubrique?.montantBrut
              }
              if(this.dataRubrique?.tauxTVA !== null){
                 //Montant Taxes (TVA)
                  this.rubrique.push('Montant Taxes (TVA)');
                  this.montant.push(this.dataRubrique?.montantTVA);
                  this.montantTVA = this.dataRubrique?.montantTVA
              }
              if(this.dataRubrique?.tauxIR !== null){
                //Montant Acomptes sur IR (AIR)
                this.rubrique.push('Montant Acomptes sur IR (AIR)');
                this.montant.push(this.dataRubrique?.montantIRNC);
                this.montantIR = this.dataRubrique?.montantIRNC
              }
          }
          this.somme = (this.netAPercevoir ? this.netAPercevoir : 0) +(this.montantTVA ? this.montantTVA : 0)+(this.montantIR ? this.montantIR : 0)+(this.montantIRNC ? this.montantIRNC : 0);
          console.log('somme ',this.somme)
          console.log('decision ',this.dataRubrique)
        }
        if(this.data?.item?.numActeJuridique?.codeProcedure==='1110' || this.data?.item?.numActeJuridique?.codeProcedure==='1111' || this.data?.item?.numActeJuridique?.codeProcedure==='1115'){
          this.dataRubrique = this.engagements.find(
            (item:any) => item.id === this.data?.item?.numActeJuridique?.id
          );
          if(this.dataRubrique?.tauxIR !== null) {
            //Net à payer
          this.rubrique.push('Net à payer');
          this.montant.push(this.dataRubrique?.netAPercevoir)
          this.netAPercevoir = this.dataRubrique?.netAPercevoir
          }
          if(this.dataRubrique?.tauxIR !== null) {
              //Montant HT
          this.rubrique.push('Montant HT');
          this.montant.push(this.dataRubrique?.montantHT);
          this.montantHT = this.dataRubrique?.montantHT
          }
          if(this.dataRubrique?.tauxIR !== null) {
              //Montant Taxes (TVA)
          this.rubrique.push('Montant Taxes (TVA)');
          this.montant.push(this.dataRubrique?.montantTVA);
          this.montantTVA = this.dataRubrique?.montantTVA
          }
          if(this.dataRubrique?.tauxIR !== null) {
            //Montant Acomptes sur IR (AIR)
          this.rubrique.push('Montant Acomptes sur IR (AIR)');
          this.montant.push(this.dataRubrique?.montantIRNC);
          this.montantIR = this.dataRubrique?.montantIRNC
          }
          console.log('commande ',this.dataRubrique)
          this.somme = (this.netAPercevoir ? this.netAPercevoir : 0) +(this.montantTVA ? this.montantTVA : 0)+(this.montantIR ? this.montantIR : 0)+(this.montantIRNC ? this.montantIRNC : 0);
          console.log('somme ',this.somme)
        }
    });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
  }

  setTraitementForm(){
    const pipe = new DatePipe('en-US');
    const date = new Date();
    const currentDate = pipe.transform(date, 'yyyy-MM-dd');
    this.traitementLiquidationForm.patchValue({
      dateLiquidation: currentDate,
      rubriqueLiquidation: JSON.stringify(this.rubrique),
      montantLiquidation: JSON.stringify(this.montant),
      liquidation: true,
      bon: this.data?.item

    });
    console.log(this.traitementLiquidationForm)
  }

}
