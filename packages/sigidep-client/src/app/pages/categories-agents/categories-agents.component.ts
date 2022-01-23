import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/categories-agents.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategorieAgentModel } from '@models/categorie-agent.model';
import {
  DeleteCategorieAgent,
  DeleteCategorieAgentFailure,
  DeleteCategorieAgentSuccess,
  GetCategoriesAgents,
} from '@actions/categorie-agent.actions';

@Component({
  selector: 'app-categories-agents',
  templateUrl: './categories-agents.component.html',
  styleUrls: ['./categories-agents.component.scss'],
})
export class CategoriesAgentsComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: CategorieAgentModel[] = [];
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
        title: 'tables.headers.code',
        sortable: true,
      },
      {
        field: 'description',
        title: 'tables.headers.label',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetCategoriesAgents());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.categories',
          },
          {
            label: 'breadcrumb.agents',
            routerLink: ['/', 'agents'],
          },
          {
            label: 'breadcrumb.grades',
            routerLink: ['/', 'grades'],
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchCategorieAgentCreateDialog();
  }

  edit(item: CategorieAgentModel) {
    this._dialogService.launchCategorieAgentCreateDialog(item);
  }

  delete(item: CategorieAgentModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteCategorie',
      accept: () => {
        this._store.dispatch(DeleteCategorieAgent({ id: item.id }));
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
        ofType(DeleteCategorieAgentSuccess, DeleteCategorieAgentFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteCategorieAgentFailure.type) {
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
        } else if (action.type === DeleteCategorieAgentSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.categories.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
