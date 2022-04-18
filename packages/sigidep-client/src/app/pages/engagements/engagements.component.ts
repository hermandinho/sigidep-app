import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import {
  getDataSelector as getCommandeDataSelector,
  getLoadingSelector as getCommandeLoadingSelector,
} from '@reducers/engagement-commande.reducer';

import {
  getDataSelector as getMissionDataSelector,
  getLoadingSelector as getMissionLoadingSelector,
} from '@reducers/engagement-mission.reducer';

import {
  getDataSelector as getDecisionDataSelector,
  getLoadingSelector as getDecisionLoadingSelector,
} from '@reducers/engagement-decision.reducer';

import {
  EngagementJuridiqueModel,
  EngagementMissionModel,
  EngagementDecisionModel,
  EngagementCommandeModel,
  EtatEngagementEnum,
} from '@models/index';
import {
  GetEngagementCommandes,
  GetEngagementJuridiques,
  GetEngagementDecisions,
  GetEngagementMissions,
  UpdateEngagementCommande,
  DeleteEngagement,
  DeleteEngagementSuccess,
  DeleteEngagementFailure,
  CancelEngagementReservation,
  CancelEngagementReservationSuccess,
  CancelEngagementReservationFailure,
  SetAppBreadcrumb,
} from '@store/actions';
import { TranslateService } from '@ngx-translate/core';
import { TabView } from 'primeng/tabview';
import { TableColumns } from './consts';

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngagementsComponent
  extends BaseComponent
  implements OnInit, AfterContentChecked
{
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: EngagementJuridiqueModel[] = [];
  commandes: EngagementCommandeModel[] = [];
  missions: EngagementMissionModel[] = [];
  decisions: EngagementDecisionModel[] = [];

  originalCommandes: EngagementCommandeModel[] = [];
  originalMissions: EngagementMissionModel[] = [];
  originalDecisions: EngagementDecisionModel[] = [];

  loading$: Observable<boolean> = of(true);
  menus!: MenuItem[];

  public busy = false;
  /*
   quick filter
  */

  public filters: any[] = [];
  public selectedFilters!: string[];
  public currentItem!:
    | EngagementCommandeModel
    | EngagementDecisionModel
    | EngagementMissionModel;

  @ViewChild(TabView) tabView!: TabView;

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
    this.filters = Object.entries(EtatEngagementEnum).map(([key, value]) => ({
      value: key,
      label: this.translate.instant(value),
    }));
    this.tableColumns = TableColumns;
    this._initListeners();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this._store.dispatch(GetEngagementCommandes());
    this._store.dispatch(GetEngagementMissions());
    this._store.dispatch(GetEngagementDecisions());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.engagements',
          },
        ],
      })
    );
  }

  ngAfterContentChecked(): void {
    //this.ref.detectChanges();
    this.menus = [
      {
        items: [
          {
            label: this.translate.instant('labels.edit'),
            icon: 'pi pi-pencil',
            command: () => {
              this.edit(this.currentItem);
            },
            disabled: this.currentItem?.etat === EtatEngagementEnum.RESERVED,
          },
          {
            label: this.translate.instant('labels.reserver'),
            icon: 'pi pi-check-square',
            command: () => {
              this.handleReservation(this.currentItem);
            },
            disabled: this.currentItem?.etat === EtatEngagementEnum.RESERVED,
          },
          {
            label: this.translate.instant('labels.annuler'),
            icon: 'pi pi-minus-circle',
            command: () => {
              this.handleCancel(this.currentItem);
            },
            disabled: this.currentItem?.etat !== EtatEngagementEnum.RESERVED,
          },
          {
            label: this.translate.instant('labels.delete'),
            icon: 'pi pi-times',
            command: () => {
              this.delete(this.currentItem);
            },
            disabled: this.currentItem?.etat === EtatEngagementEnum.RESERVED,
          },
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

  get currentLang() {
    return this.translate.currentLang;
  }

  handleFilter = (event: any) => {
    this.commandes = this.originalCommandes.filter((item) =>
      this.selectedFilters.includes(item.etat)
    );
    this.missions = this.originalMissions.filter((item) =>
      this.selectedFilters.includes(item.etat)
    );
    this.decisions = this.originalDecisions.filter((item) =>
      this.selectedFilters.includes(item.etat)
    );
  };

  get currentLangCurrencyFormat() {
    return this.currentLang === 'fr' ? 'fr-FR' : 'en-EN';
  }
  async openForm() {
    this._dialogService.launchEngagementCreateDialog();
  }

  edit(item: EngagementJuridiqueModel) {
    this._dialogService.launchEngagementCreateDialog(item);
  }

  delete(item: EngagementJuridiqueModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteEngagement',
      accept: () => {
        this._store.dispatch(DeleteEngagement({ id: item.id }));
      },
    });
  }

  handleReservation(
    item:
      | EngagementCommandeModel
      | EngagementDecisionModel
      | EngagementMissionModel
  ) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.reserveEngagement',
      accept: () => {
        this._dialogService.launchEngagementCreateDialog(item, 'book');
      },
    });
  }

  handlePrint(
    item:
      | EngagementCommandeModel
      | EngagementDecisionModel
      | EngagementMissionModel
  ) {
    this._dialogService.launchPrintEngagementDialog(item);
  }

  handleCancel(
    item:
      | EngagementCommandeModel
      | EngagementDecisionModel
      | EngagementMissionModel
  ) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.cancelEngagement',
      accept: () => {
        this._store.dispatch(CancelEngagementReservation({ payload: item }));
      },
    });
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getCommandeDataSelector))
      .subscribe((data) => {
        this.commandes = [...data];
        this.originalCommandes = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getCommandeLoadingSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getMissionDataSelector))
      .subscribe((data) => {
        this.missions = [...data];
        this.originalMissions = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getMissionLoadingSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getDecisionDataSelector))
      .subscribe((data) => {
        this.decisions = [...data];
        this.originalDecisions = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getDecisionLoadingSelector),
      map((status) => status)
    );

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteEngagementSuccess, DeleteEngagementFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteEngagementFailure.type) {
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
        } else if (action.type === DeleteEngagementSuccess.type) {
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
          CancelEngagementReservationSuccess,
          CancelEngagementReservationFailure
        )
      )
      .subscribe((action) => {
        if (action.type === CancelEngagementReservationFailure.type) {
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
        } else if (action.type === CancelEngagementReservationSuccess.type) {
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
