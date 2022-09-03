import { Component, OnInit } from '@angular/core';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';

@Component({
  selector: 'app-transmission-liquidation',
  templateUrl: './transmission-liquidation.component.html',
  styleUrls: ['./transmission-liquidation.component.scss']
})
export class TransmissionLiquidationComponent implements OnInit {

  public transmissionLiquidation = EtatBonEnum.TRANSMISSIONLIQUIDATION;
  public etat = EtatBonEnum.EDITIONTITRECREANCE;
  constructor() { }

  ngOnInit(): void {
  }

}
