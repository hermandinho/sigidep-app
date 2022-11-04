import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { EngagementCommandeModel } from '@models/engagement-commande.model';
import { EngagementDecisionModel } from '@models/engagement-decision.model';
import { EngagementMissionModel } from '@models/engagement-mission.model';
import { EtatEngagementEnum, Step } from '@models/engagement-juridique.model';
import { AppService } from '@services/app.service';
import { ApisService } from '@services/apis.service';

import { select, Store } from '@ngrx/store';
import { GetEngagementCommandes } from '@actions/engagement-commande.actions';
import { GetEngagementMissions } from '@actions/engagement-mission.actions';
import { AppState } from '@reducers/index';

import { getDataSelector as getEngagementCommandeDataSelector } from '@reducers/engagement-commande.reducer';

import { getDataSelector as getEngagementMissionDataSelector } from '@reducers/engagement-mission.reducer';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { NombreJours, UnJourEnMilliSeconde } from './consts';
import { GetEngagementDecisions } from '@actions/engagement-decision.actions';
import { DialogsService } from '@services/dialogs.service';
import { check } from './config';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-engagement',
  templateUrl: './reservation-engagement.component.html',
  styleUrls: ['./reservation-engagement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationEngagementComponent
  extends BaseComponent
  implements OnInit {
  public form!: FormGroup;

  public engagement!:
    | EngagementCommandeModel
    | EngagementDecisionModel
    | EngagementMissionModel
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
    console.log('dernierCommande', this.dernierCommande)
    this.type = this.config.data?.type;
    console.log('type ', this.type)
    this.form = this._fb.group({
      id: [undefined],
      disponibiliteCredits: [undefined, check()],
      respectNonMorcellement: [undefined, this.type === 'command' ? check() : null,],
      priseEnCompteTaxes: [undefined, this.type === 'decision' ? check() : null,],
      respectQuotas: [undefined, this.type === 'mission' ? check() : null],
      respectNonChevauchement: [undefined, this.type === 'mission' ? check() : null]
    });
    this._initListeners();
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getEngagementCommandeDataSelector))
      .subscribe((payload) => {
        if (payload && payload.length > 1) {
          console.log('payload', payload)
          this.findEngagementByImputationAndNiu(payload);
        }
      });

    if (this.type === 'mission') {
      this._store
        .pipe(this.takeUntilDestroy, select(getEngagementMissionDataSelector))
        .subscribe((payload) => {
          this.findEngagementByMatriculeBenefiviare(payload)
          this.cumulJoursMissions = payload
            .filter(
              (item) =>
                item.matriculeBeneficiaire ===
                (this.engagement as EngagementMissionModel)
                  .matriculeBeneficiaire
            )
            .map((item) => item.nombreJours)
            .reduce((acc, curr) => acc + curr, 0);
        });
    }
    this.form.patchValue({
      id: this.engagement.id,
      disponibiliteCredits:
        this.engagement.montantAE <= this.engagement.aeDisponible,
      /*   respectNonMorcellement: this.dernierCommande
          ? Math.abs(
            moment(this.dernierCommande?.dateSignature).diff(moment(this.engagement.dateSignature))) >= NombreJours
          : true, */
      priseEnCompteTaxes:
        (this.engagement as EngagementDecisionModel).netAPercevoir ===
        (this.engagement as EngagementDecisionModel).montantBrut -
        (this.engagement as EngagementDecisionModel).montantIRNC,
      respectQuotas: this.cumulJoursMissions <= 100,
    });
  }

  get isValid() {
    return this.form.valid;
  }
  close() {
    this.ref.close();
  }

  handleSubmit = () => {
    //this.busy = true;
    let editedEngagement = {
      ...this.engagement,
      etat: EtatEngagementEnum.RESERVED,
    };

    const method: Observable<any> =
      this.type === 'mission'
        ? this._apisService.put<EngagementMissionModel>(
          '/engagements/missions/reservation',
          editedEngagement
        )
        : this.type === 'command'
          ? this._apisService.put<EngagementMissionModel>(
            '/engagements/commandes/reservation',
            editedEngagement
          )
          : this._apisService.put<EngagementMissionModel>(
            '/engagements/decisions/reservation',
            editedEngagement
          );
    method.subscribe(
      (res) => {
        //this.busy = false;
        this.ref.close(res);
        this.type === 'mission'
          ? this._store.dispatch(GetEngagementMissions({}))
          : this.type === 'command'
            ? this._store.dispatch(GetEngagementCommandes({}))
            : this._store.dispatch(GetEngagementDecisions({}));
        this._dialogService.launchPrintEngagementDialog(res);
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

  findEngagementByImputationAndNiu = (engagements: EngagementCommandeModel[]) => {
    const deniereEngagement: EngagementCommandeModel[] = engagements.filter((item: EngagementCommandeModel) =>
      (item?.imputation.toLowerCase() === this.engagement?.imputation.toLowerCase()) &&
      (item?.niuContribuable?.toLowerCase() === this.engagement?.niuContribuable?.toLowerCase()) &&
      (item?.etat.toLowerCase() === EtatEngagementEnum.RESERVED)
    )
    console.log('deniereEngagementex', deniereEngagement)
    if (deniereEngagement && deniereEngagement.length > 0) {
      //deniereEngagement.forEach(item => {
      this.dernierCommande = deniereEngagement[0];
      console.log('dernierCommande', this.dernierCommande)
      console.log('DatedernierCommande', moment(this.dernierCommande?.dateSignature))
      console.log('DateCommande', moment(this.engagement.dateSignature))
      let date = new Date()
      console.log('morcellement ', Math.abs(
        moment(this.dernierCommande?.dateSignature).diff(moment(date))) / UnJourEnMilliSeconde)
      if (Math.abs(
        moment(this.dernierCommande?.dateSignature).diff(moment(this.engagement.dateSignature))) / UnJourEnMilliSeconde >= NombreJours) {
        this.form.patchValue({
          respectNonMorcellement: true,
        });
        const pipe = new DatePipe('en-US');
        this.nombreJoursRestantPourLeRespectMorcellement = (NombreJours - (Math.abs(
          moment(this.dernierCommande?.dateSignature).diff(moment(date))) / UnJourEnMilliSeconde)
        ) + 1;
        console.log(this.nombreJoursRestantPourLeRespectMorcellement)
        let dernierCommande = new Date(this.dernierCommande?.dateSignature);
        let dat = new Date(this.dernierCommande?.dateSignature);
        dat.setDate(dernierCommande.getDate() + NombreJours);
        this.prochaineDate = pipe.transform(dat, 'yyyy-MM-dd');

        console.log(this.prochaineDate)

      } else {
        const pipe = new DatePipe('en-US');
        this.nombreJoursRestantPourLeRespectMorcellement = (NombreJours - (Math.abs(
          moment(this.dernierCommande?.dateSignature).diff(moment(date))) / UnJourEnMilliSeconde)
        ) + 1;
        console.log(this.nombreJoursRestantPourLeRespectMorcellement)
        let dernierCommande = new Date(this.dernierCommande?.dateSignature);
        let dat = new Date(this.dernierCommande?.dateSignature);
        dat.setDate(dernierCommande.getDate() + NombreJours);
        this.prochaineDate = pipe.transform(dat, 'yyyy-MM-dd');

        console.log(this.prochaineDate)
        this.form.patchValue({
          respectNonMorcellement: false,
        });

      }

      // })
    } else {
      this.form.patchValue({
        respectNonMorcellement: true,
      });
    }

    return deniereEngagement;
  }

  findEngagementByMatriculeBenefiviare = (engagements: EngagementMissionModel[]) => {
    const deniereEngagementMission: EngagementMissionModel[] = engagements.filter((item: EngagementMissionModel) =>
      (item?.matriculeBeneficiaire?.toLowerCase() === this.engagement?.matriculeBeneficiaire?.toLowerCase()) &&
      (item?.exercise?.toString() === this.engagement?.exercise?.toString()) &&
      (item?.etat === EtatEngagementEnum.RESERVED)
    )
    console.log(deniereEngagementMission)
    if (deniereEngagementMission.length > 0) {
      deniereEngagementMission.forEach(item => {
        if ((this.engagement.dateDebut > item.dateDebut && item.dateDebut < this.engagement.dateFin) &&
          (this.engagement.dateDebut > item.dateFin && item.dateFin < this.engagement.dateFin) ||
          (this.engagement.dateDebut < item.dateDebut && item.dateDebut > this.engagement.dateFin) &&
          (this.engagement.dateDebut < item.dateFin && item.dateFin > this.engagement.dateFin) ||
          (this.engagement.dateDebut > item.dateDebut && item.dateDebut < this.engagement.dateFin) &&
          (this.engagement.dateDebut > item.dateFin && item.dateFin < this.engagement.dateFin)
        ) {
          this.statutChevauchement = 'Bon';
          this.form.patchValue({
            respectNonChevauchement: true,
          });
        }
      })
    } else {
      this.statutChevauchement = 'Bon';
      this.form.patchValue({
        respectNonChevauchement: true,
      });
    }
    return deniereEngagementMission;
  }
}
