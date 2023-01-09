import { Component, OnInit } from '@angular/core';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';

@Component({
  selector: 'app-visa-et-transmisssion',
  templateUrl: './visa-et-transmisssion.component.html',
  styleUrls: ['./visa-et-transmisssion.component.scss']
})
export class VisaEtTransmisssionComponent implements OnInit {
  public transmissionConformite = EtatBonEnum.TRANSMISCONTROLECONFORMITE;
  public etat = EtatBonEnum.CERTIFICAT;
  constructor(){}

  ngOnInit(): void {}
}
