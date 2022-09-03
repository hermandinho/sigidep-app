import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumnsBordereau, TableColumnsTransmission } from './consts';
import { map } from 'rxjs/operators';
import { BaseComponent } from '@components/base.component';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { TransmissionsReceptionModel } from '@models/transmission-reception.model';
import { Observable, of } from 'rxjs';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { CreateTransmissionsReception, GetTransmissionsReceptions } from '@actions/transmissions-receptions.actions';
import { getDataSelector as getDataSelectorTrans , getLoadingSelector as getLoadingSelectorTrans } from '@reducers/transmissions-receptions.reducer';
import { SetAppBreadcrumb } from '@actions/app.actions';
import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';
import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { GetExercises } from '@actions/exercises.actions';
import { getDataSelector as getDataSelectorEx, getLoadingSelector as getLoadingSelectorEx } from '@reducers/exercise.reducer';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';

@Component({
  selector: 'app-listing-transmission-liquidation',
  templateUrl: './listing-transmission-liquidation.component.html',
  styleUrls: ['./listing-transmission-liquidation.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingTransmissionLiquidationComponent extends BaseComponent
implements OnInit {

  public tableColumnsTransmission:any[]=[];
  public tableColumnsBordereau:any[]=[];
  public bordereauxTransmissions:any[]=[];
  public dossiersBordereaux:any[]=[];
  public globalColumnsTransmission!: string[];
  public globalColumnsBordereaux!: string[];
  menus!: MenuItem[];
  loading$: Observable<boolean> = of(true);
  loading1$: Observable<boolean> = of(true);
  public currentItem!: TransmissionsReceptionModel;
  public filters: any[] = [];
  public selectedFilters!: string[];
  data: any[] = [];
  public exercices:any;




  constructor(
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    public translate: TranslateService,
    private readonly _appService: AppService,


  ) {
    super();
    this.tableColumnsTransmission = TableColumnsTransmission;
    this.tableColumnsBordereau = TableColumnsBordereau;
    this.globalColumnsTransmission = this.tableColumnsTransmission.map((item) => item.field);
    this.globalColumnsBordereaux = this.tableColumnsBordereau.map((item) => item.field);
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(
      GetTransmissionsReceptions({objets:[EtatBonEnum.TRANSMISSIONLIQUIDATION]})
    );
    this._store.dispatch(
      GetTransmissionsReceptionsDetails({etats: [EtatBonEnum.TRANSMISSIONLIQUIDATION]})
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

  handleCancel(item: any) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.cancelTransmission',
      accept: () => {
        this._store.dispatch(
          CreateTransmissionsReception({ payload: item })
        );
        this._store.dispatch(
          GetTransmissionsReceptionsDetails({etats: [EtatBonEnum.EDITIONTITRECREANCE]})
        );
        this._appService.showToast({
          summary: 'messages.success',
          detail: 'messages.transmission.cancelSuccess',
          severity: 'success',
          life: 3000,
          closable: true,
        });
      },
    });
  }
  handleFilter = (event: any) => {
      if(event?.value){
        this._store.dispatch(
          GetTransmissionsReceptions({exercices:[event?.value[0]?.toLowerCase()]})
        );
        this._store.dispatch(
          GetTransmissionsReceptionsDetails({exercices:[event?.value[0]?.toLowerCase()]})
        );
      }else{
        this._store.dispatch(
          GetTransmissionsReceptions({})
        );
        this._store.dispatch(
          GetTransmissionsReceptionsDetails({})
        );
      }

  };

  async openForm() {
    this._dialogService.launchTransmissionReceptionCreateDialog();
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelectorTrans))
      .subscribe((data) => {
        console.log(data)
        if(data !== null){
          this.bordereauxTransmissions = [...data];
          if(this.bordereauxTransmissions===[null]) this.bordereauxTransmissions=[];
          console.log('bordereauxTransmissions ', this.bordereauxTransmissions)
        }


      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelectorTrans),
      map((status) => status)
    );

    this._store
    .pipe(this.takeUntilDestroy, select(getDataSelectorDetail))
    .subscribe((data) => {
      this.dossiersBordereaux = [...data];
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
