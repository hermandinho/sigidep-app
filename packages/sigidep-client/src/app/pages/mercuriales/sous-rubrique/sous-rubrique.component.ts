import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/sous-rubriques.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetRubriques } from '@actions/rubriques.actions';
import { SousRubriqueModel } from '@models/sous-rubrique.model';
import {
  DeleteSousRubrique,
  DeleteSousRubriqueFailure,
  DeleteSousRubriquesuccess,
  GetSousRubriques,
} from '@actions/sous-rubriques.actions';

@Component({
  selector: 'app-sous-rubrique',
  templateUrl: './sous-rubrique.component.html',
  styleUrls: ['./sous-rubrique.component.scss'],
})
export class SousRubriqueComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: SousRubriqueModel[] = [];
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
        field: 'rubrique',
        title: 'tables.headers.rubrique',
        sortable: false,
      },
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
    this._store.dispatch(GetSousRubriques());
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
    this._dialogService.launchSousRubriqueCreateDialog();
  }

  edit(item: SousRubriqueModel) {
    this._dialogService.launchSousRubriqueCreateDialog(item);
  }

  delete(item: SousRubriqueModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.delete',
      accept: () => {
        this._store.dispatch(DeleteSousRubrique({ id: item.id }));
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
        ofType(DeleteSousRubriquesuccess, DeleteSousRubriqueFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteSousRubriqueFailure.type) {
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
        } else if (action.type === DeleteSousRubriquesuccess.type) {
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
