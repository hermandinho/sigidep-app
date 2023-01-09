import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { Step } from '@models/engagement-juridique.model';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Observable, of } from 'rxjs';
import { DialogsService } from '@services/dialogs.service';
import { check } from './config';
import { BonEngagementModel } from '../../models/bon-engagement.model';
import { GetBonsEngagements } from '../../store/actions/bons-engagements.actions';

@Component({
  selector: 'app-reservation-bon-engagement',
  templateUrl: './reservation-bon-engagement.component.html',
  styleUrls: ['./reservation-bon-engagement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationBonEngagementComponent extends BaseComponent
implements OnInit {
public form!: FormGroup;

public engagement!: BonEngagementModel
  | any;

public aeDisponible!: number;
public dernierCommande!: EngagementCommandeModel;
public cumulJoursMissions!: number;
public nombreJoursRestantPourLeRespectMorcellement: number = 0;
public type!: Step;
loading$: Observable<boolean> = of(true);
statutChevauchement = 'Mauvais';
prochaineDate: any;

constructor(
  public ref: DynamicDialogRef,
  public config: DynamicDialogConfig,
  private _fb: FormBuilder,
  private _appService: AppService,
  private _apisService: ApisService,
  private _store: Store<AppState>,
  private readonly _dialogService: DialogsService
) {
  super();
}

ngOnInit(): void {
  this.engagement = this.config.data?.item;
  console.log('engagement ', this.engagement)
  console.log('engagement montantCPChiffres', this.engagement.montantCPChiffres <= this.engagement.montantAE)
  this.form = this._fb.group({
    id: [undefined],
    disponibiliteCredits: [undefined, check()],
  });
  this._initListeners();

}
private _initListeners() {
  this.form.patchValue({
    id: this.engagement.id,
    disponibiliteCredits:
      this.engagement.montantCPChiffres <= this.engagement.montantAE,

  });
}

get isValid() {
  return this.form.valid;
}
close() {
  this.ref.close();
}

handleSubmit = () => {
  const method: Observable<any> = this._apisService.put<BonEngagementModel>(
    '/bons-engagements/reservation',
    this.engagement
  );

  method.subscribe(
    (res) => {
      //this.busy = false;
      this.ref.close(res);
      this._store.dispatch(
        GetBonsEngagements({ procedures: [res?.codeProcedure] })
      );
      this._dialogService.launchPrintBonEngagementPrimeDialog(res);
      this._appService.showToast({
        summary: 'messages.success',
        detail:
          'messages.engagementsreservationSuccess' +
          ': numéro: ' +
          res.numero,
        severity: 'success',
        life: 3000,
        closable: true,
      });
    },
    ({ error }) => {
      let err = '';
      if (error?.statusCode === 409) {
        err = 'errors.engagements.conflict';
      } else {
        err = 'errors.unknown';
      }
      //this.busy = false;
      this._appService.showToast({
        detail: err,
        summary: 'errors.error',
        severity: 'error',
        life: 5000,
        closable: true,
      });
    }
  );
};
}
