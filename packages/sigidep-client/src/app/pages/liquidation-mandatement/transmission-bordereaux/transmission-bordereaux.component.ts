import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../components/base.component';
import { EtatBonEnum } from '../../../utils/etat-bon-engagement.enum';

@Component({
  selector: 'app-transmission-bordereaux',
  templateUrl: './transmission-bordereaux.component.html',
  styleUrls: ['./transmission-bordereaux.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransmissionBordereauxComponent extends BaseComponent implements OnInit {
  public transmissionControleRegularite = EtatBonEnum.TRANSMISSIONCONTROLEDEREGULARITE;
  public etat = EtatBonEnum.ORDONNANCEMENT;
  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }
}
