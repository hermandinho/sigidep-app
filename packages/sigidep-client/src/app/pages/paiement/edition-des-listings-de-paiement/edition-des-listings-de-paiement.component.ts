import { ChangeDetectionStrategy, Component, OnInit, AfterContentChecked } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseComponent } from '@components/base.component';
import { MenuItem, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { TransmissionsReceptionModel } from '@models/transmission-reception.model';
import { Observable, of } from 'rxjs';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { GetTransmissionsReceptions } from '@actions/transmissions-receptions.actions';
import { SetAppBreadcrumb } from '@actions/app.actions';
import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';
import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { GetExercises } from '@actions/exercises.actions';
import { getDataSelector as getDataSelectorEx, getLoadingSelector as getLoadingSelectorEx } from '@reducers/exercise.reducer';
import { DataModel } from '@models/data.model';
import { ApisService } from '@services/apis.service';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';
import { TableColumnsBordereau } from './consts';

@Component({
  selector: 'app-edition-des-listings-de-paiement',
  templateUrl: './edition-des-listings-de-paiement.component.html',
  styleUrls: ['./edition-des-listings-de-paiement.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditionDesListingsDePaiementComponent extends BaseComponent
implements OnInit {

  public tableColumnsTransmission:any[]=[];
  public tableColumnsBordereau:any[]=[];
  public dossiersBordereaux:any[]=[];
  public dossiersBordereaux_tmp:any[]=[];
  public globalColumnsTransmission!: string[];
  public globalColumnsBordereaux!: string[];
  menus!: MenuItem[];
  loading$: Observable<boolean> = of(true);
  loading1$: Observable<boolean> = of(true);
  public currentItem!: TransmissionsReceptionModel;
  public filters: any[] = [];
  public selectedFilters!: string[];
  data: any[]=[];
  public exercices:any;
  busy=false;
  date1!: string;
  date2!: string;




  constructor(
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    public translate: TranslateService,
    private readonly _appService: AppService,
    private _apisService: ApisService,



  ) {
    super();
    this.tableColumnsBordereau = TableColumnsBordereau;
    this.globalColumnsTransmission = this.tableColumnsTransmission.map((item) => item.field);
    this.globalColumnsBordereaux = this.tableColumnsBordereau.map((item) => item.field);
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(
      GetTransmissionsReceptionsDetails({objets:[EtatBonEnum.TRANSMISSIONACT],etats: [EtatBonEnum.PAIEMENT]})
    );
    this._store.dispatch(
      GetExercises({})
    );

    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.transmissionsReceptions',
          },
        ],
      })
    );

  }
  onChangeDate(event:any, elt:string){
    console.log('date1 ',this.date1, ' date2', this.date2)
    console.log(elt)
    if (elt === "date1"){
      this.date1 = event.target.value.toLowerCase()
    }

    if (elt === "date2"){
      this.date2 = event.target.value.toLowerCase()
    }

    if(this.date1 && this.date2){
      console.log('date1 ',this.date1, ' date2', this.date2)
      this.dossiersBordereaux = [];
      this.dossiersBordereaux_tmp.forEach(element => {
        if (element?.bon_engagement?.paiements[0]?.datePaiement?.toLowerCase()<=this.date2 && element?.bon_engagement?.paiements[0]?.datePaiement?.toLowerCase()>=this.date1){
          this.dossiersBordereaux.push(element)
        }
      });
    }

  }
  annuler(){
    this.dossiersBordereaux = this.dossiersBordereaux_tmp;
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


  handleFilter = (event: any) => {
      if(event?.value){
        this._store.dispatch(
          GetTransmissionsReceptionsDetails({exercices:[event?.value[0]?.toLowerCase()], objets:[EtatBonEnum.TRANSMISSIONACT],etats: [EtatBonEnum.PAIEMENT]})
        );
      }else{
        this._store.dispatch(
          GetTransmissionsReceptionsDetails({objets:[EtatBonEnum.TRANSMISSIONACT],etats: [EtatBonEnum.PAIEMENT]})
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


}
