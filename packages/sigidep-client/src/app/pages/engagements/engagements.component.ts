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
  getDataSelector,
  getLoadingSelector,
} from '@reducers/engagement-commande.reducer';
import {
  EngagementJuridiqueModel,
  EngagementMissionModel,
  EngagementDecisionModel,
  EngagementCommandeModel,
} from '@models/index';
import {
  GetEngagementCommandes,
  DeleteEngagement,
  DeleteEngagementSuccess,
  DeleteEngagementFailure,
  SetAppBreadcrumb,
} from '@store/actions';

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss'],
})
export class EngagementsComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: EngagementJuridiqueModel[] = [];
  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions
  ) {
    super();

    this.tableColumns = [
      {
        field: 'procedure',
        title: 'tables.headers.procedure',
        sortable: true,
      },
      {
        field: 'exercise',
        title: 'tables.headers.exercise',
        sortable: true,
      },
      {
        field: 'sousProgramme',
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
        field: 'numero',
        title: 'tables.headers.numero',
        sortable: false,
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

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
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
