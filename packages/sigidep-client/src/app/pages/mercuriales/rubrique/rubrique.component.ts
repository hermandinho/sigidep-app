import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/rubriques.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { RubriqueModel } from '@models/rubrique.model';
import {
  DeleteRubrique,
  DeleteRubriqueFailure,
  DeleteRubriquesuccess,
  GetRubriques,
} from '@actions/rubriques.actions';

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.scss'],
})
export class RubriqueComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: RubriqueModel[] = [];
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
        field: 'label',
        title: 'tables.headers.label',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetRubriques());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.articles',
            routerLink: ['/', 'articles'],
          },
          {
            label: 'breadcrumb.rubriques',
            routerLink: ['/', 'rubriques'],
          },
          {
            label: 'breadcrumb.sous-rubriques',
            routerLink: ['/', 'sous-rubriques'],
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchRubriqueCreateDialog();
  }

  edit(item: RubriqueModel) {
    this._dialogService.launchRubriqueCreateDialog(item);
  }

  delete(item: RubriqueModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteRubrique',
      accept: () => {
        this._store.dispatch(DeleteRubrique({ id: item.id }));
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
        ofType(DeleteRubriquesuccess, DeleteRubriqueFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteRubriqueFailure.type) {
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
        } else if (action.type === DeleteRubriquesuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.rubriques.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
