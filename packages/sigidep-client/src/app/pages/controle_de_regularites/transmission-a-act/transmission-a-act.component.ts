import { Component, OnInit } from '@angular/core';
import { EtatBonEnum } from '../../../utils/etat-bon-engagement.enum';

@Component({
  selector: 'app-transmission-a-act',
  templateUrl: './transmission-a-act.component.html',
  styleUrls: ['./transmission-a-act.component.scss']
})
export class TransmissionAACTComponent implements OnInit {
  public transmissionACT = EtatBonEnum.TRANSMISSIONACT;
  public etat = EtatBonEnum.CONTROLEREGULARITE;
  constructor() { }

  ngOnInit(): void {
  }

}
