import { SetAppBreadcrumb } from '@actions/app.actions';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { ContribuableModel } from '@models/contribuable.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { Observable, of } from 'rxjs';
import * as fromContribuables from '@reducers/contribuables.reducer';
import { map } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import {
  DeleteContribuable,
  DeleteContribuableFailure,
  DeleteContribuableSuccess,
} from '@actions/contribuables.actions';

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
        title: 'tables.headers.codeContribubale',
        sortable: true,
      },
      {
        field: 'raisonSociale',
        title: 'tables.headers.raisonSociale',
        sortable: true,
      },
      {
        field: 'secteurActivite',
        title: 'tables.headers.secteurActivite',
        sortable: true,
      },
      {
        field: 'regimeFiscal',
        title: 'tables.headers.regimeFiscal',
        sortable: false,
      },
      {
        field: 'regimeFiscal',
        title: 'tables.headers.regimeFiscal',
        sortable: false,
      },
      {
        field: 'rib',
        title: 'tables.headers.rib',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
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

  edit = (item: ContribuableModel) => {
    this._dialogService.launchContribuablesCreateDialog(item);
  };

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(fromContribuables.getDataSelector))
      .subscribe((data) => (this.data = data));

    this.loading$ = this._store.pipe(
      select(fromContribuables.getLoadingSelector),
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

  delete = (item: ContribuableModel) => {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteContribubale',
      accept: () => {
        this._store.dispatch(DeleteContribuable({ id: item.id }));
      },
    });
  };
}
