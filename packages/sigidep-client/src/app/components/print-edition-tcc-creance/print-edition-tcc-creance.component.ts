import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@reducers/index';
import { AppService } from '@services/app.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BonEngagementModel } from '../../models/bon-engagement.model';
import { GetImputations } from '../../store/actions/consultations.actions';
import { GetEngagementJuridiquesByCategory } from '../../store/actions/engagements.actions';
import { EngagementCommandeModel } from '../../models/engagement-commande.model';
import { EngagementDecisionModel } from '../../models/engagement-decision.model';
import { EngagementMissionModel } from '../../models/engagement-mission.model';
import { GetEngagementJuridiques } from '../../store/actions/engagement-juridique.actions';
import { Engagement } from '../../utils/types';
import {
  getDataSelector as getDataSelectorImp,
  getLoadingSelector as getLoadingSelectorImp,
} from '@reducers/consultations.reducer';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/engagements.reducer';


@Component({
  selector: 'app-print-edition-tcc-creance',
  templateUrl: './print-edition-tcc-creance.component.html',
  styleUrls: ['./print-edition-tcc-creance.component.scss']
})
export class PrintEditionTccCreanceComponent extends BaseComponent implements OnInit {
  loading1$: Observable<boolean> = of(true);
  public dossiersBordereaux:any[]=[];
  public bon!: BonEngagementModel;
  public transmission: any;
  dataImp:any;
  public banque = '';
  public descriptionProcedure = '';
  public engagements!: (
    | EngagementCommandeModel
    | EngagementDecisionModel
    | EngagementMissionModel
  )[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _store: Store<AppState>,
    public translate: TranslateService,
    private readonly _appService: AppService,
  ) {
    super();
    this._initListeners()
  }

  ngOnInit(){


  if(this.config.data?.item){
    console.log('this.config.data?.item',this.config.data?.item)
    this._store.dispatch(
      GetTransmissionsReceptionsDetails({ ids: [this.config.data?.item?.data[0].id] })
    );
  }


  }

  getEncour(imputation:string) {
    this._store.dispatch(GetImputations({ imputation: imputation }));
    this._initListenersImp();
  }

  private _initListeners() {
    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorDetail))
    .subscribe((data) => {
      this.dossiersBordereaux = [...data];
     /*  if(this.dossiersBordereaux.length>0){
        const act: any = this.dossiersBordereaux.find(
          (item:any) => item.id === this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.id
        );
      } */
      console.log('dossiersBordereaux ', this.dossiersBordereaux)
      if(this.dossiersBordereaux){
        if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1110') {
          this.descriptionProcedure = 'BCA-Bon de Commande Administratif';

        }else if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1111') {
          this.descriptionProcedure = 'LC-Lettre Commande';
        }else if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1115') {
          this.descriptionProcedure = 'Marché';
        }else if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1121') {
          this.descriptionProcedure = 'Missions';
        }else if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1122') {
          this.descriptionProcedure = 'Primes';
        }else if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1123') {
          this.descriptionProcedure = 'Frais de Relève';
        }else if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1124') {
          this.descriptionProcedure = 'Mise à Disposition-Agent';
        }else if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1125') {
          this.descriptionProcedure = 'Mise à Disposition-Structure';
        }else if (this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure == '1126') {
          this.descriptionProcedure = 'Déblocage-Contribuable';
        }
        this.getEncour(this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.imputation)
        this.getEngagementJuridiques(this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.codeProcedure)
      }

    });

    this.loading1$ = this._store.pipe(
      select(getLoadingSelectorDetail),
      map((status) => status)
    );
  }

  private _initListenersImp() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelectorImp))
      .subscribe((data) => {
        this.dataImp = [...data];
        console.log(this.dataImp)
      });
  }

  getEngagementJuridiques(item:string){
    if(item === '1110' || item === '1111' || item === '1115'){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'commande',
        })
      );
    }else if(item === '1126'){
      this._store.dispatch(
        GetEngagementJuridiquesByCategory({
          category: 'decision',
        })
      );
    }

    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelector))
    .subscribe((data) => {
      this.engagements = [...data];
      console.log('this.engagements ',this.engagements)
      if(this.engagements){
        const act: any = this.engagements.find(
          (item:any) => item.id === this.dossiersBordereaux[0]?.bon_engagement?.numActeJuridique?.id
        );



        if(act?.codeProcedure === '1110' || act?.codeProcedure === '1111' || act?.codeProcedure === '1115'){
          this.banque = act ? act?.niuContribuable+ ' '+ act?.raisonSociale : ''
        }else if(item === '1126'){
          this.banque =act ? act?.numContribuable + ' '+ act?.nomContribBudget : ''
        }
      }

    });

  }
  close() {
    this.ref.close();
  }
}
