import { ChangeDetectionStrategy, Component, OnInit, AfterContentChecked } from '@angular/core';
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
export class ControleConformiteComponent extends BaseComponent implements OnInit, AfterContentChecked {

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
      GetTransmissionsReceptionsDetails({etats: [EtatBonEnum.RECEPTIONCONTROLECONFORMITE, EtatBonEnum.RECEPTIONCONTROLECONFORMITE],})
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

  ngAfterContentChecked(): void {
    this.menus = [
      {
        items: [
          {
            label: this.translate.instant('labels.controler'),
            icon: 'pi pi-pencil',
            command: () => {
              this.handleControler(this.currentItem);
            },
            //disabled: this.currentItem?.bon_engagement[0]?.etat === EtatBonEnum.RECEPTIONLIQUIDATION
          },
          {
            label: this.translate.instant('labels.rejeter'),
            icon: 'pi pi-check-square',
            command: () => {
              this.handleRejeter(this.currentItem);
            },
            //disabled: this.currentItem?.etat === EtatBonEnum.ENREGISTREMENTLIQUIDATION || this.currentItem?.etat === EtatBonEnum.LIQUIDATIONMODIFIEE
          },
          {
            label: this.translate.instant('labels.editionTCC'),
            icon: 'pi pi-minus-circle',
            command: () => {
              this.handleEditionTCC(this.currentItem);
            },
            //disabled: this.currentItem?.etat === EtatBonEnum.ENREGISTREMENTLIQUIDATION || this.currentItem?.etat === EtatBonEnum.LIQUIDATIONMODIFIEE
          },

        ],
      },
    ];
  }

  handleControler(item: any) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.EnregistrerTraitementLiquidationMandatement',
      accept: () => {
        this._dialogService.launchtraitementLiquidationMandatementCreateDialog(
          item,
          'enregistrer'
        );
      },
    });
  }

  handleRejeter(item: any) {
    const data1:DataModel = {
      data : item,
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

  handleEditionTCC(item: any) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.EnregistrerTraitementLiquidationMandatement',
      accept: () => {
        const data1: DataModel = {
          data: item,
          action: 'edition',
          motif: ''
        }
        console.log(data1)
        const method: Observable<any> = this._apisService.put<any>(
          '/transmissions-receptions',
          data1
        );
        method.subscribe(
          (res) => {
            console.log(res)
            this.busy = false;
            this._store.dispatch(
              GetTransmissionsReceptionsDetails({/*  etats: [EtatBonEnum.RECEPTIONCONTROLECONFORMITE]  */})
            );
            //this._dialogService.launchPrintEditionCreanceDialog(res)
            this._appService.showToast({
              summary: 'messages.success',
              detail: 'dialogs.messages.edition-tcc',
              severity: 'success',
              life: 3000,
              closable: true,
            });
          },
          ({ error }) => {
            let err = '';
            if (error?.statusCode === 409) {
              err = 'errors.transmission.notfound';
            } else {
              err = 'errors.unknown';
            }
            this.busy = false;
            this._appService.showToast({
              detail: err,
              summary: 'errors.error',
              severity: 'error',
              life: 5000,
              closable: true,
            });
          }
        );
      },
    });
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
}