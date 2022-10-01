import { Component, OnInit, ChangeDetectionStrategy, AfterContentChecked } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../components/base.component';
import { Observable, of } from 'rxjs';
import { DataModel } from '../../../models/data.model';
import { DialogsService } from '../../../services/dialogs.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/reducers/index';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../services/app.service';
import { ApisService } from '../../../services/apis.service';
import { TableColumnsTransmission, TableColumnsBordereau } from './consts';
import { EtatBonEnum } from '../../../utils/etat-bon-engagement.enum';
import { GetExercises } from '../../../store/actions/exercises.actions';
import { SetAppBreadcrumb } from '../../../store/actions/app.actions';
import { map } from 'rxjs/operators';
import { GetTransmissionsReceptionsDetails } from '../../../store/actions/detail-transmissions-receptions.actions';
import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { getDataSelector as getDataSelectorEx, getLoadingSelector as getLoadingSelectorEx } from '@reducers/exercise.reducer';
import { Router, NavigationExtras } from '@angular/router';
import { TraitementBonEngagementModel } from '../../../models/traitement-bon-engagement.model';

@Component({
  selector: 'app-controle-regularite',
  templateUrl: './controle-regularite.component.html',
  styleUrls: ['./controle-regularite.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControleRegulariteComponent extends BaseComponent
implements OnInit, AfterContentChecked {
public busy = false;
public tableColumnsTransmission: any[] = [];
public tableColumnsBordereau: any[] = [];
public bordereauxTransmissions: any[] = [];
public dossiersBordereaux: any[] = [];
public dossiersBordereaux_tmp: any[] = [];
public globalColumnsTransmission!: string[];
public globalColumnsBordereaux!: string[];
menus!: MenuItem[];
loading$: Observable<boolean> = of(true);
loading1$: Observable<boolean> = of(true);
public currentItem!: any;
public filters: any[] = [];
public selectedFilters!: string[];
data: any[] = [];
data1!: DataModel;
public exercices: any;
click = false;




constructor(
  private readonly _dialogService: DialogsService,
  private _store: Store<AppState>,
  public translate: TranslateService,
  private readonly _appService: AppService,
  private _apisService: ApisService,
  private router: Router


) {
  super();
  this.tableColumnsTransmission = TableColumnsTransmission;
  this.tableColumnsBordereau = TableColumnsBordereau;
  this.globalColumnsTransmission = this.tableColumnsTransmission.map((item) => item.field);
  this.globalColumnsBordereaux = this.tableColumnsBordereau.map((item) => item.field);
  console.log(this.globalColumnsBordereaux)
  this._initListeners();
}

ngOnInit(): void {
  this._store.dispatch(
    GetTransmissionsReceptionsDetails({})
  );
  this._store.dispatch(
    GetExercises({})
  );

  this._store.dispatch(
    SetAppBreadcrumb({
      breadcrumb: [
        {
          label: 'breadcrumb.receptionBordereaux',
        },
      ],
    })
  );

}

searchSelect(event: any) {
  this.dossiersBordereaux = this.dossiersBordereaux_tmp;
  this.dossiersBordereaux = this.dossiersBordereaux_tmp.filter( (item) =>
      (item.bon_engagement?.numero ? item.bon_engagement?.numero.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.bon_engagement?.numActeJuridique.numero ? item.bon_engagement?.numActeJuridique.numero.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.bon_engagement?.numActeJuridique.imputation ? item.bon_engagement?.numActeJuridique.imputation.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.bon_engagement?.etat ? item.bon_engagement?.etat.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.bon_engagement?.objet ? item.bon_engagement?.objet.toLowerCase().includes(event.target.value.toLowerCase()) : '')||
      (item.bon_engagement?.numActeJuridique.montantAE ? item.bon_engagement?.numActeJuridique.montantAE.toString().includes(event.target.value.toLowerCase()) : '') ||
      (item.bon_engagement?.montantCPChiffres ? item.bon_engagement?.montantCPChiffres.toString().includes(event.target.value.toLowerCase()): '') ||
     (item.bon_engagement?.dateEngagement ? item.bon_engagement?.dateEngagement.toLowerCase().includes(event.target.value.toLowerCase()) : '') ||
      (item.bon_engagement?.nomGestionnaire ? item.bon_engagement?.nomGestionnaire.toLowerCase().includes(event.target.value.toLowerCase()):'')
  );
}

ngAfterContentChecked(): void {
  this.menus = [
    {
      items: [
        {
          label: this.translate.instant('labels.controlerRegularite'),
          icon: 'pi pi-pencil',
          command: () => {
            this.handleControlerRegularite(this.currentItem);
          },
         // disabled: this.currentItem?.bon_engagement[0]?.etat === EtatBonEnum.RECEPTIONLIQUIDATION
        },
        {
          label: this.translate.instant('labels.rejeter'),
          icon: 'pi pi-check-square',
          command: () => {
            this.handleRejeter(this.currentItem);
          },
          //disabled: this.currentItem?.etat === EtatBonEnum.ENREGISTREMENTLIQUIDATION || this.currentItem?.etat === EtatBonEnum.LIQUIDATIONMODIFIEE
        },
      ],
    },
  ];
}

handleControlerRegularite(item: any) {
  this._appService.showConfirmation({
    message: 'dialogs.messages.decisionControleRegularite',
    accept: () => {
      this._dialogService.launchDecisionControleRegularite(
        item,
        'controle'
      );
    },
  });
}

handleRejeter(item: any) {
  this._appService.showConfirmation({
    message: 'dialogs.messages.rejeterControleRegularite',
    accept: () => {
      this._dialogService.launchDecisionControleRegularite(
        item,
        'rejet'
      );
    },
  });
}

handleFilter = (event: any) => {
  if (event?.value) {
    this._store.dispatch(
      GetTransmissionsReceptionsDetails({ exercices: [event?.value[0]?.toLowerCase()],etats:[EtatBonEnum.RECEPTIONLIQUIDATION] })
    );
  } else {
    this._store.dispatch(
      GetTransmissionsReceptionsDetails({etats:[EtatBonEnum.RECEPTIONLIQUIDATION]})
    );
  }

};

get currentLang() {
  return this.translate.currentLang;
}

get currentLangCurrencyFormat() {
  return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
}

private _initListeners() {
  this._store
  .pipe(this.takeUntilDestroy, select(getDataSelectorDetail))
  .subscribe((data) => {
    this.dossiersBordereaux = [...data];
    this.dossiersBordereaux_tmp = [...data];
    console.log('dossiersBordereaux ', this.dossiersBordereaux)

  });

this.loading1$ = this._store.pipe(
  select(getLoadingSelectorDetail),
  map((status) => status)
);



  this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorEx))
    .subscribe((data) => {
      this.exercices = [...data];
      console.log('exercices ', this.exercices)

    });

  this.loading1$ = this._store.pipe(
    select(getLoadingSelectorEx),
    map((status) => status)
  );


}

goToWithParams(url: string, params: any) {
  const extra: NavigationExtras = {
    queryParams: { param: params }
  };
  this.router.navigate([url], extra);
}

}
