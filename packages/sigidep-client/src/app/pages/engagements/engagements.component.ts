import { Component, OnInit, ViewChild } from '@angular/core';
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
  SetAppBreadcrumb,
} from '@store/actions';
import { TranslateService } from '@ngx-translate/core';
import { ApisService } from '@services/apis.service';
import { TabView } from 'primeng/tabview';

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss'],
  providers: [MessageService],
})
export class EngagementsComponent extends BaseComponent implements OnInit {
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

  public filters = [
    {
      label: this.translate.instant('labels.save'),
      value: EtatEngagementEnum.SAVE,
    },
    {
      label: this.translate.instant('labels.modify'),
      value: EtatEngagementEnum.MODIFY,
    },
    {
      label: this.translate.instant('labels.book'),
      value: EtatEngagementEnum.RESERVED,
    },
    {
      label: this.translate.instant('labels.cancel'),
      value: EtatEngagementEnum.CANCEL,
    },
  ];
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
    private messageService: MessageService,
    private _apisService: ApisService,

    private primengConfig: PrimeNGConfig
  ) {
    super();

    this.tableColumns = [
      {
        field: 'codeProcedure',
        title: 'tables.headers.type',
        sortable: true,
      },
      {
        field: 'numero',
        title: 'tables.headers.numero',
        sortable: false,
      },
      {
        field: 'etat',
        title: 'tables.headers.etat',
        sortable: true,
      },
      {
        field: 'exercise',
        title: 'tables.headers.exercise',
        sortable: true,
      },
      {
        field: 'subProgram',
        title: 'tables.headers.sousProgramme',
        sortable: true,
      },
      {
        field: 'action',
        title: 'tables.headers.action',
        sortable: true,
      },
      {
        field: 'activity',
        title: 'tables.headers.activity',
        sortable: true,
      },
      {
        field: 'task',
        title: 'tables.headers.task',
        sortable: true,
      },

      {
        field: 'montantAE',
        title: 'tables.headers.montantAE',
        sortable: false,
      },
      {
        field: 'adminUnit',
        title: 'tables.headers.adminUnit',
        sortable: false,
      },
      {
        field: 'imputation',
        title: 'tables.headers.imputation',
        sortable: true,
      },

      {
        field: 'reference',
        title: 'tables.headers.reference',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.menus = [
      {
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => {
              this.edit(this.currentItem);
            },
          },
          {
            label: 'Book',
            icon: 'pi pi-check-square',
            command: () => {
              this.handleReservation(this.currentItem);
            },
          },
          {
            label: 'Cancel',
            icon: 'pi pi-minus-circle',
            command: () => {
              this.handleCancel(this.currentItem);
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.delete(this.currentItem);
            },
          },
          {
            label: 'Print',
            icon: 'pi pi-print',
            command: () => {
              this.handlePrint(this.currentItem);
            },
          },
        ],
      },
    ];
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
    //TODO
  }

  handleCancel(
    item:
      | EngagementCommandeModel
      | EngagementDecisionModel
      | EngagementMissionModel
  ) {
    this.busy = true;
    this._appService.showConfirmation({
      message: 'dialogs.messages.cancelEngagement',
      accept: () => {
        this._apisService
          .put<EngagementJuridiqueModel>('/engagements/' + item.id, null)
          .subscribe(
            (res) => {
              this.busy = false;
              this._appService.showToast({
                summary: 'messages.success',
                detail:
                  'messages.engagements.cancelSuccess' +
                  ': numéro: ' +
                  res.numero,
                severity: 'success',
                life: 3000,
                closable: true,
              });
              if (item instanceof EngagementCommandeModel)
                this._store.dispatch(GetEngagementCommandes());
              else if (item instanceof EngagementDecisionModel)
                this._store.dispatch(GetEngagementDecisions());
              else this._store.dispatch(GetEngagementMissions());
            },
            ({ error }) => {
              let err = '';
              if (error?.statusCode === 409) {
                err = 'errors.engagements.cancelError';
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
  }
}
