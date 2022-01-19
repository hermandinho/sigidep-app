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
} from '@reducers/contribuables.reducer';
import { ContribuableModel } from '@models/index';
import {
  DeleteContribuable,
  DeleteContribuableFailure,
  DeleteContribuableSuccess,
  GetContribuables,
  GetBanks,
  GetRegimes,
  SetAppBreadcrumb,
} from '@store/actions';

@Component({
  selector: 'app-contribuables',
  templateUrl: './contribuables.component.html',
  styleUrls: ['./contribuables.component.scss'],
})
export class ContribuablesComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: ContribuableModel[] = [];
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
        field: 'code',
        title: 'tables.headers.codeContribuable',
        sortable: true,
      },
      {
        field: 'raisonSociale',
        title: 'tables.headers.raisonSociale',
        sortable: false,
      },
      {
        field: 'secteurActivite',
        title: 'tables.headers.secteurActivite',
        sortable: false,
      },
      {
        field: 'regimeFiscal',
        title: 'tables.headers.regimeFiscal',
        sortable: true,
      },
      {
        field: 'banque',
        title: 'tables.headers.codeBanque',
        sortable: false,
      },
      {
        field: 'agence',
        title: 'tables.headers.codeAgence',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetContribuables());
    this._store.dispatch(GetRegimes());
    this._store.dispatch(GetBanks());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.contribuables',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchContribuablesCreateDialog();
  }

  edit(item: ContribuableModel) {
    this._dialogService.launchContribuablesCreateDialog(item);
  }

  delete(item: ContribuableModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteContribuable',
      accept: () => {
        this._store.dispatch(DeleteContribuable({ id: item.id }));
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
        ofType(DeleteContribuableSuccess, DeleteContribuableFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteContribuableFailure.type) {
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
        } else if (action.type === DeleteContribuableSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.contribuables.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
