import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumnsBordereau } from '../controle-conformite/consts';
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
import { CreateTransmissionsReception, GetTransmissionsReceptions } from '@actions/transmissions-receptions.actions';
import { SetAppBreadcrumb } from '@actions/app.actions';
import { GetTransmissionsReceptionsDetails } from '@actions/detail-transmissions-receptions.actions';
import { getDataSelector as getDataSelectorDetail, getLoadingSelector as getLoadingSelectorDetail } from '@reducers/detail-transmissions-receptions.reducer';
import { getDataSelector as getDataSelectorEx, getLoadingSelector as getLoadingSelectorEx } from '@reducers/exercise.reducer';
import { ApisService } from '@services/apis.service';
import { DataModel } from '@models/data.model';
import { EtatBonEnum } from 'app/utils/etat-bon-engagement.enum';

@Component({
  selector: 'app-controle-conformite',
  templateUrl: './controle-conformite.component.html',
  styleUrls: ['./controle-conformite.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControleConformiteComponent extends BaseComponent implements OnInit {

  public tableColumnsTransmission:any[]=[];
  public tableColumnsBordereau:any[]=[];
  public dossiersBordereaux:any[]=[];
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
      GetTransmissionsReceptionsDetails({etats: [EtatBonEnum.RECEPTIONCONTROLECONFORMITE],})
    );
  /*   this._store.dispatch(
      GetExercises({})
    ); */

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
          GetTransmissionsReceptionsDetails({exercices:[event?.value[0]?.toLowerCase()], etats: [EtatBonEnum.RECEPTIONCONTROLECONFORMITE]})
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

 /*  selected(item:any){
    this.data = item;
  } */
  rejet(){
    const data1:DataModel = {
      data : this.data,
      action: 'rejet',
      motif:''
    }
    console.log("data ",this.data)
    this._appService.showConfirmation({
      message: 'dialogs.messages.alertRejet',
      accept: () => {
        this._dialogService.launchMotifRejetCreateDialog(
          data1,
        );
      },
    });

  }

  selected(e:any,item:any[]) {
    if (e.target.checked) {
      console.log('selected')
      this.data.push(item);
      e.currentTarget.parentNode.style.backgroundColor = 'rgb(0, 140, 255)'
      const parent = e.currentTarget.parentNode;
      parent.children[0].style.backgroundColor = 'rgb(0, 140, 255)';
    }
    else {
      console.log('selected selected error')
      this.data = [];
      e.currentTarget.parentNode.style.backgroundColor = 'white'
      const parent = e.currentTarget.parentNode;
      parent.children[0].style.backgroundColor = 'white';
    }
  }
}
