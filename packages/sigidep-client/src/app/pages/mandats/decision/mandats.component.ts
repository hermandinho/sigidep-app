import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  CancelEngagementMandatsReservation,
  CancelEngagementMandatsReservationFailure,
  CancelEngagementMandatsReservationSuccess,
  DeleteEngagementMandats,
  DeleteEngagementMandatsFailure,
  DeleteEngagementMandatsSuccess,
  GetEngagementMandats,
} from '@actions/engagement-mandat.actions';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { EngagementMandatModel } from '@models/engagement-mandat.model';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  getDataSelector as getDataSelectorm,
  getLoadingSelector as getLoadingSelectorm,
} from '@reducers/engagement-mandat.reducer';
import { AppState } from '@reducers/index';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { EtatMandatEnum } from 'app/utils/etat-mandat.enum';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
<<<<<<< HEAD
import { TableColumns } from './consts';

@Component({
  selector: 'app-mandats',
  templateUrl: './mandats.component.html',
  styleUrls: ['./mandats.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MandatsComponent
  extends BaseComponent
  implements OnInit, AfterContentChecked
{
<<<<<<< HEAD
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: any[] = [];
=======
import { codesProceduresCommandes, TableColumns } from './consts';

@Component({
  selector: 'app-mandats-commandes',
  templateUrl: './mandats-commandes.component.html',
  styleUrls: ['./mandats-commandes.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MandatsCommandesComponent
  extends BaseComponent
  implements OnInit, AfterContentChecked {
=======
>>>>>>> 43cbcf5 (mandat-commandes)
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: any[] = [];
<<<<<<<< HEAD:packages/sigidep-client/src/app/pages/mandats/primes/mandats.component.ts
  bonsCommandes: EngagementMandatModel[] = [];
  lettresCommandes: EngagementMandatModel[] = [];
  marches: EngagementMandatModel[] = [];
  originalData: EngagementMandatModel[] = [];
  bonsCommandesData: EngagementMandatModel[] = [];

  marchesData: EngagementMandatModel[] = [];
  lettresCommandesData: EngagementMandatModel[] = [];

========
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
  deblocages: EngagementMandatModel[] = [];
  structures: EngagementMandatModel[] = [];
  agents: EngagementMandatModel[] = [];
  releves: EngagementMandatModel[] = [];
  primes: EngagementMandatModel[] = [];
  originalData: EngagementMandatModel[] = [];
  deblocagesData: EngagementMandatModel[] = [];
  structuresData: EngagementMandatModel[] = [];
  agentsData: EngagementMandatModel[] = [];
  relevesData: EngagementMandatModel[] = [];
  primesData: EngagementMandatModel[] = [];
<<<<<<< HEAD
=======
>>>>>>>> 019fd3c (gestion des procedure mandat-decision):packages/sigidep-client/src/app/pages/mandats/decision/mandats.component.ts
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
  loading$: Observable<boolean> = of(true);
  menus!: MenuItem[];
  public globalColumns!: string[];

  public busy = false;
  /*
   quick filter
  */

  public filters: any[] = [];
  public selectedFilters!: string[];
  public currentItem!: EngagementMandatModel;

  public printing: boolean = false;
  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService,
    private primengConfig: PrimeNGConfig,
    private ref: ChangeDetectorRef
  ) {
    super();
    this.filters = Object.entries(EtatMandatEnum).map(([key, value]) => ({
      value: key,
      label: this.translate.instant(value),
    }));
    this.tableColumns = TableColumns;
    this.globalColumns = this.tableColumns.map((item) => item.field);
    this._initListeners();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    // code procedure  prime 1122
    this.getData('1122');
    this.getData('1123');
    this.getData('1124');
    this.getData('1125');
    this.getData('1126');

    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
<<<<<<< HEAD
            label: 'breadcrumb.mandatsPrimes',
=======
            label: 'breadcrumb.mandatsMissions',
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
          },
        ],
      })
    );
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 43cbcf5 (mandat-commandes)
  getData(item: any) {
    this._store.dispatch(
      GetEngagementMandats({
        procedures: [item],
      })
    );
<<<<<<< HEAD
=======
  getData(item:any){
    this._store.dispatch(GetEngagementMandats({
      procedures: [item]
    }));
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
=======
>>>>>>> 43cbcf5 (mandat-commandes)
  }
  ngAfterContentChecked(): void {
    this.menus = [
      {
        items: [
          {
            label: this.translate.instant('labels.edit'),
            icon: 'pi pi-pencil',
            command: () => {
              this.edit(this.currentItem);
            },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 43cbcf5 (mandat-commandes)
            disabled:
              this.currentItem?.etat !== EtatMandatEnum.ANNULATIONMANDAT &&
              this.currentItem?.etat !== EtatMandatEnum.ANNULELORSRESERVATION &&
              this.currentItem?.etat !== EtatMandatEnum.REJETLORSRESERVATION &&
              this.currentItem?.etat !==
                EtatMandatEnum.REJETCONTROLECONFORMITE &&
              this.currentItem?.etat !==
                EtatMandatEnum.REJETCONTROLEREGULARITE &&
              this.currentItem?.etat !== EtatMandatEnum.MANDATENREGISTRE &&
              this.currentItem?.etat !== EtatMandatEnum.MANDATMODIFIE,
<<<<<<< HEAD
=======
            disabled: this.currentItem?.etat !== EtatMandatEnum.ANNULATIONMANDAT && this.currentItem?.etat !== EtatMandatEnum.ANNULELORSRESERVATION && this.currentItem?.etat !== EtatMandatEnum.REJETLORSRESERVATION && this.currentItem?.etat !== EtatMandatEnum.REJETCONTROLECONFORMITE && this.currentItem?.etat !== EtatMandatEnum.REJETCONTROLEREGULARITE && this.currentItem?.etat !== EtatMandatEnum.MANDATENREGISTRE && this.currentItem?.etat !== EtatMandatEnum.MANDATMODIFIE,
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
=======
>>>>>>> 43cbcf5 (mandat-commandes)
          },
          {
            label: this.translate.instant('labels.reserver'),
            icon: 'pi pi-check-square',
            command: () => {
              this.handleReservation(this.currentItem);
            },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 43cbcf5 (mandat-commandes)
            disabled:
              this.currentItem?.etat !== EtatMandatEnum.MANDATENREGISTRE &&
              this.currentItem?.etat !== EtatMandatEnum.ANNULELORSRESERVATION &&
              this.currentItem?.etat !== EtatMandatEnum.MANDATMODIFIE,
<<<<<<< HEAD
=======
            disabled: this.currentItem?.etat !== EtatMandatEnum.MANDATENREGISTRE && this.currentItem?.etat !== EtatMandatEnum.ANNULELORSRESERVATION && this.currentItem?.etat !== EtatMandatEnum.MANDATMODIFIE
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
=======
>>>>>>> 43cbcf5 (mandat-commandes)
          },
          {
            label: this.translate.instant('labels.annuler'),
            icon: 'pi pi-minus-circle',
            command: () => {
              this.handleCancel(this.currentItem);
            },
            disabled: this.currentItem?.etat !== EtatMandatEnum.MANDATRESERVE,
          },
          /*{
            label: this.translate.instant('labels.delete'),
            icon: 'pi pi-times',
            command: () => {
              this.delete(this.currentItem);
            },
            disabled: this.currentItem?.etat === EtatMandatEnum.MANDATRESERVE
          }, */
          {
            label: this.translate.instant('labels.print'),
            icon: 'pi pi-print',
            command: () => {
              this.handlePrint(this.currentItem);
            },
          },
        ],
      },
    ];
  }

  handleFilter = (event: any) => {
    this.primes = this.primesData;
    if (event?.value[0]?.toLowerCase())
<<<<<<< HEAD
<<<<<<< HEAD
      this.primes = this.primesData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );

    this.releves = this.relevesData;
    if (event?.value[0]?.toLowerCase())
      this.releves = this.relevesData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );

    this.agents = this.agentsData;
    if (event?.value[0]?.toLowerCase())
      this.agents = this.agentsData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );

    this.structures = this.structuresData;
    if (event?.value[0]?.toLowerCase())
      this.structures = this.structuresData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );

    this.deblocages = this.deblocagesData;
    if (event?.value[0]?.toLowerCase())
      this.deblocages = this.deblocagesData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );
=======
      this.primes = this.primesData.filter(item => item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase()));
=======
      this.primes = this.primesData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );
>>>>>>> 43cbcf5 (mandat-commandes)

    this.releves = this.relevesData;
    if (event?.value[0]?.toLowerCase())
      this.releves = this.relevesData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );

    this.agents = this.agentsData;
    if (event?.value[0]?.toLowerCase())
      this.agents = this.agentsData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );

    this.structures = this.structuresData;
    if (event?.value[0]?.toLowerCase())
      this.structures = this.structuresData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );

<<<<<<< HEAD
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
=======
    this.deblocages = this.deblocagesData;
    if (event?.value[0]?.toLowerCase())
      this.deblocages = this.deblocagesData.filter((item) =>
        item.etat.toLowerCase().includes(event?.value[0]?.toLowerCase())
      );
>>>>>>> 43cbcf5 (mandat-commandes)
  };

  handleReservation(item: EngagementMandatModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.reserveMandatEngagement',
      accept: () => {
        this._dialogService.launchEngagementMandatCreateDialog(
<<<<<<< HEAD
<<<<<<< HEAD
          'decision',
=======
          'commande',
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
=======
          'decision',
>>>>>>> 43cbcf5 (mandat-commandes)
          item,
          'book'
        );
      },
    });
  }

  handleCancel(item: EngagementMandatModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.cancelMandatEngagement',
      accept: () => {
        this._store.dispatch(
          CancelEngagementMandatsReservation({ payload: item })
        );
      },
    });
  }

  handlePrint(item: EngagementMandatModel) {
    this._dialogService.launchPrintEngagementMandatPrimeDialog(item);
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
  }
  async openForm() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 43cbcf5 (mandat-commandes)
    this._dialogService.launchEngagementMandatCreateDialog('decision');
  }

  edit(item: EngagementMandatModel) {
    this._dialogService.launchEngagementMandatCreateDialog('decision', item);
<<<<<<< HEAD
=======
    this._dialogService.launchEngagementMandatCreateDialog('commande');
  }

  edit(item: EngagementMandatModel) {
    this._dialogService.launchEngagementMandatCreateDialog('commande', item);
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
=======
>>>>>>> 43cbcf5 (mandat-commandes)
  }

  delete(item: EngagementMandatModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteEngagement',
      accept: () => {
        this._store.dispatch(DeleteEngagementMandats({ id: item.id }));
      },
    });
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelectorm))
      .subscribe((data) => {
        this.data = [...data];
<<<<<<< HEAD
<<<<<<< HEAD
        if (this.data[0]?.numActeJuridique?.codeProcedure === '1122') {
          this.primes = [...data];
          this.primesData = [...data];
        }
        if (this.data[0]?.numActeJuridique.codeProcedure === '1123') {
          this.releves = [...data];
          this.relevesData = [...data];
        }
        if (this.data[0]?.numActeJuridique.codeProcedure === '1124') {
          this.agents = [...data];
          this.agentsData = [...data];
        }
        if (this.data[0]?.numActeJuridique.codeProcedure === '1125') {
          this.structures = [...data];
          this.structuresData = [...data];
        }
        if (this.data[0]?.numActeJuridique.codeProcedure === '1126') {
=======
        if(this.data[0]?.numActeJuridique?.codeProcedure === "1122"){
=======
        if (this.data[0]?.numActeJuridique?.codeProcedure === '1122') {
>>>>>>> 43cbcf5 (mandat-commandes)
          this.primes = [...data];
          this.primesData = [...data];
        }
        if (this.data[0]?.numActeJuridique.codeProcedure === '1123') {
          this.releves = [...data];
          this.relevesData = [...data];
        }
        if (this.data[0]?.numActeJuridique.codeProcedure === '1124') {
          this.agents = [...data];
          this.agentsData = [...data];
        }
        if (this.data[0]?.numActeJuridique.codeProcedure === '1125') {
          this.structures = [...data];
          this.structuresData = [...data];
        }
<<<<<<< HEAD
        if(this.data[0]?.numActeJuridique.codeProcedure === "1126"){
>>>>>>> 019fd3c (gestion des procedure mandat-decision)
=======
        if (this.data[0]?.numActeJuridique.codeProcedure === '1126') {
>>>>>>> 43cbcf5 (mandat-commandes)
          this.deblocages = [...data];
          this.deblocagesData = [...data];
        }
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelectorm),
      map((status) => status)
    );

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteEngagementMandatsSuccess, DeleteEngagementMandatsFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteEngagementMandatsFailure.type) {
          if (action.error?.statusCode === 403) {
            this._appService.showUnauthorizedActionToast();
          } else {
            this._appService.showToast({
              severity: 'error',
              summary: 'errors.error',
              detail: 'errors.error',
              closable: true,
            });
          }
        } else if (action.type === DeleteEngagementMandatsSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.engagements.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(
          CancelEngagementMandatsReservationSuccess,
          CancelEngagementMandatsReservationFailure
        )
      )
      .subscribe((action) => {
        if (action.type === CancelEngagementMandatsReservationFailure.type) {
          if (action.error?.statusCode === 403) {
            this._appService.showUnauthorizedActionToast();
          } else {
            this._appService.showToast({
              severity: 'error',
              summary: 'errors.error',
              detail: 'errors.error',
              closable: true,
            });
          }
        } else if (
          action.type === CancelEngagementMandatsReservationSuccess.type
        ) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.engagements.cancelSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
