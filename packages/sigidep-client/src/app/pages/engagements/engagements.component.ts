import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss'],
})
export class EngagementsComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: EngagementJuridiqueModel[] = [];
  commandes: EngagementCommandeModel[] = [];
  missions: EngagementMissionModel[] = [];
  decisions: EngagementDecisionModel[] = [];

  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService
  ) {
    super();

    this.tableColumns = [
      {
        field: 'numero',
        title: 'tables.headers.numero',
        sortable: false,
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
        field: 'etat',
        title: 'tables.headers.etat',
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

  reserve(item: EngagementCommandeModel) {
    const engagement = { ...item, etat: EtatEngagementEnum.RESERVED };
    this._appService.showConfirmation({
      message: 'dialogs.messages.reserveEngagement',
      accept: () => {
        this._store.dispatch(UpdateEngagementCommande({ payload: item }));
      },
    });
  }
  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getCommandeDataSelector))
      .subscribe((data) => {
        this.commandes = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getCommandeLoadingSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getMissionDataSelector))
      .subscribe((data) => {
        this.missions = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getMissionLoadingSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getDecisionDataSelector))
      .subscribe((data) => {
        this.decisions = [...data];
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
