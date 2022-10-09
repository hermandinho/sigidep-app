import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PieceJointeModel } from '../../models/piece-jointe.model';
import { BaseComponent } from '../base.component';
import * as converter from 'number-to-words';

@Component({
  selector: 'app-editer-rapport-traitement-liquidation-mandatement',
  templateUrl: './editer-rapport-traitement-liquidation-mandatement.component.html',
  styleUrls: ['./editer-rapport-traitement-liquidation-mandatement.component.scss']
})
export class EditerRapportTraitementLiquidationMandatementComponent extends BaseComponent implements OnInit {
  dataPieceJointes!: PieceJointeModel[];
  rubriques: any[] = [];
  montants: any[] = [];
  data!: any;
  totalLiquidation = 0;
  montant_en_lettre: string = '';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    super()
   }

  ngOnInit(): void {
      this.data = this.config.data?.item;
      this.rubriques = JSON.parse(this.config.data?.item?.traitements[0]?.rubriqueLiquidation);
      this.montants = JSON.parse(this.config.data?.item?.traitements[0]?.montantLiquidation);
      this.dataPieceJointes = JSON.parse(this.config.data?.item?.traitements[0]?.piecesJointe);
      console.log('rubriqueLiquidation', JSON.parse(this.config.data?.item?.traitements[0]?.rubriqueLiquidation))
      console.log('pieceJointe', JSON.parse(this.config.data?.item?.traitements[0]?.piecesJointe))

      for(let i = 0; i< this.montants.length; i++){
        this.totalLiquidation +=  parseInt(this.montants[i]);
        console.log(this.totalLiquidation)
        this.montant_en_lettre = converter.toWords(this.totalLiquidation)
      }
  }

}
