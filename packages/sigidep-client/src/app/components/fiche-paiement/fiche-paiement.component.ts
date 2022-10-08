import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GetBonsEngagements } from '../../store/actions/bons-engagements.actions';
import { getDataSelector } from '@reducers/bons-engagements.reducer';
import { BaseComponent } from '../base.component';
import { PieceJointeModel } from '../../models/piece-jointe.model';
import * as converter from 'number-to-words';

@Component({
  selector: 'app-fiche-paiement',
  templateUrl: './fiche-paiement.component.html',
  styleUrls: ['./fiche-paiement.component.scss']
})
export class FichePaiementComponent  extends BaseComponent implements OnInit {

  data: any;
  dataPieceJointes!: PieceJointeModel[];
  rubriques: any[] = [];
  montants: any[] = [];
  data1!: any;
  totalLiquidation = 0;
  montant_en_lettre: string = '';
  date: number = 0;
  constructor(private _store: Store<AppState>,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { super(); this._initListeners() }


  ngOnInit(): void {
    console.log(this.config.data.item.numero)
      this._store.dispatch(
        GetBonsEngagements({
          numeros: [this.config.data.item.numero],
        })
      );
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        console.log(this.data);
        if(this.data.length>0){
          this.rubriques = JSON.parse(this.data[0]?.traitements[0]?.rubriqueLiquidation);
          this.montants = JSON.parse(this.data[0]?.traitements[0]?.montantLiquidation);
          this.dataPieceJointes = JSON.parse(this.data[0]?.traitements[0]?.piecesJointe);
          console.log('rubriqueLiquidation', JSON.parse(this.data[0]?.traitements[0]?.rubriqueLiquidation))
          console.log('pieceJointe', JSON.parse(this.data[0]?.traitements[0]?.piecesJointe))
          console.log('data', this.config.data?.item)

          for(let i = 0; i< this.montants.length; i++){
            this.totalLiquidation +=  parseInt(this.montants[i]);
            console.log(this.totalLiquidation)
            this.montant_en_lettre = converter.toWords(this.totalLiquidation)
          }

          this.date = 1966 + parseInt(this.data?.numActeJuridique?.exercise)
         }

      });
  }
}
