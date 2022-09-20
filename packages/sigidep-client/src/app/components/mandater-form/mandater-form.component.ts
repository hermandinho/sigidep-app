import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../base.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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

@Component({
  selector: 'app-mandater-form',
  templateUrl: './mandater-form.component.html',
  styleUrls: ['./mandater-form.component.scss']
})
export class MandaterFormComponent extends BaseComponent implements OnInit {
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

  constructor(
    private _store: Store<AppState>,
    public ref: DynamicDialogRef,
  ) {

    super()
    this._initListeners();
   }

  ngOnInit(): void {
    this.traitementLiquidationForm = this.startingForm;
    this.traitementLiquidationForm.controls['matriculeGestionnaire'].disable();
    this.traitementLiquidationForm.controls['nomGestionnaire'].disable();
    this.traitementLiquidationForm.controls['numeroBon'].disable();
    console.log('traitementLiquidationForm',this.traitementLiquidationForm)
    this.subformInitialized.emit(this.traitementLiquidationForm);
    this.traitementLiquidationForm.patchValue({
      matriculeGestionnaire:this.data?.item?.bon_engagement?.matriculeGestionnaire,
      nomGestionnaire: this.data?.item?.bon_engagement?.nomGestionnaire,
      numeroBon: this.data?.item?.bon_engagement?.numero
    });

    console.log('item ',this.data.item)
    if(this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure === '1121'){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'mission'
        })
      );
    }
    if(this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1122'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1123'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1124'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1125'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1126'){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'decision'
        })
      );
    }

    if(this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1110'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1111'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1115'){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'commande'
        })
      );
    }
  }

  doChangeStep = (direction: any) => {
    this.changeStep.emit(direction);
  };

  submit = () => {
    this.setTraitementForm();
    console.log(this.traitementLiquidationForm)
    this.submitForm.emit();
  };

  close() {
    this.ref.close();
  }
  private async _initListeners() {
    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelector))
    .subscribe((data) => {
      this.engagements = [...data];
      console.log(this.engagements)
        if(this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure === '1121'){
          this.dataRubrique = this.engagements.find(
            (item:any) => item.id === this.data?.item?.bon_engagement?.numActeJuridique?.id
          );
          this.rubrique.push('Net à payer');
          this.montant.push(this.dataRubrique?.moment)
          console.log('mission ',this.dataRubrique)
        }
        if(this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1122'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1123'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1124'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1125'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1126'){
          this.dataRubrique = this.engagements.find(
            (item:any) => item.id === this.data?.item?.bon_engagement?.numActeJuridique?.id
          );
          console.log(this.dataRubrique)
          if(this.dataRubrique?.netAPercevoir !== null){
            this.rubrique.push('Net à payer');
            this.montant.push(this.dataRubrique?.netAPercevoir)
          }
          if(this.dataRubrique?.montantIRNC !== null){
            this.rubrique.push('Montant IRNC');
            this.montant.push(this.dataRubrique?.montantIRNC);
          }

          if(this.dataRubrique?.codeProcedure === 1126){
              //Montant HT
              if(this.dataRubrique?.montantHT !== null){
                this.rubrique.push('Montant HT');
                this.montant.push(0);
              }
              if(this.dataRubrique?.tauxTVA !== null){
                 //Montant Taxes (TVA)
                  this.rubrique.push('Montant Taxes (TVA)');
                  this.montant.push(this.dataRubrique?.tauxTVA);
              }
              if(this.dataRubrique?.tauxIR !== null){
                //Montant Acomptes sur IR (AIR)
                this.rubrique.push('Montant Acomptes sur IR (AIR)');
                this.montant.push(this.dataRubrique?.tauxIR);
              }


          }
          console.log('decision ',this.dataRubrique)
        }
        if(this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1110'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1111'||this.data?.item?.bon_engagement?.numActeJuridique?.codeProcedure==='1115'){
          this.dataRubrique = this.engagements.find(
            (item:any) => item.id === this.data?.item?.bon_engagement?.numActeJuridique?.id
          );
          if(this.dataRubrique?.tauxIR !== null) {
            //Net à payer
          this.rubrique.push('Net à payer');
          this.montant.push(this.dataRubrique?.netAPercevoir)
          }
          if(this.dataRubrique?.tauxIR !== null) {
              //Montant HT
          this.rubrique.push('Montant HT');
          this.montant.push(0);
          }
          if(this.dataRubrique?.tauxIR !== null) {
              //Montant Taxes (TVA)
          this.rubrique.push('Montant Taxes (TVA)');
          this.montant.push(this.dataRubrique?.tauxTVA);
          }
          if(this.dataRubrique?.tauxIR !== null) {
            //Montant Acomptes sur IR (AIR)
          this.rubrique.push('Montant Acomptes sur IR (AIR)');
          this.montant.push(this.dataRubrique?.tauxIR);
          }
          console.log('commande ',this.dataRubrique)
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
      dateOrdonnancement: currentDate,
      rubriqueOrdonnancement: JSON.stringify(this.rubrique),
      montantOrdonnancement: JSON.stringify(this.montant),
      ordonnancement: true,
      bon: this.data?.item?.bon_engagement

    });
    console.log(this.traitementLiquidationForm)
  }

}
