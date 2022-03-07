import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/exec-taxes.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExecTaxesModel } from '@models/exec-taxes.model';
import {
  DeleteTaxe,
  DeleteTaxeFailure,
  DeleteTaxeSuccess,
  GetTaxes,
} from '@actions/exec-taxes.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss'],
})
export class TaxesComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: ExecTaxesModel[] = [];
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
        field: 'code',
        title: 'tables.headers.code',
        sortable: true,
      },
      {
        field: 'label',
        title: 'tables.headers.label',
        sortable: false,
      },
      {
        field: 'TxTVA',
        title: 'tables.headers.TxTVA',
        sortable: true,
      },
      {
        field: 'TxIR',
        title: 'tables.headers.TxIR',
        sortable: true,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetTaxes());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.taxes',
          },
          {
            label: 'breadcrumb.procedures',
            routerLink: ['/', 'procedures'],
          },
          {
            label: 'breadcrumb.engagements',
            routerLink: ['/', 'engagements'],
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
    this._dialogService.launchTaxeCreateDialog();
  }

  edit(item: ExecTaxesModel) {
    this._dialogService.launchTaxeCreateDialog(item);
  }

  delete(item: ExecTaxesModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteTaxe',
      accept: () => {
        this._store.dispatch(DeleteTaxe({ id: item.id }));
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
      .pipe(this.takeUntilDestroy, ofType(DeleteTaxeSuccess, DeleteTaxeFailure))
      .subscribe((action) => {
        if (action.type === DeleteTaxeFailure.type) {
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
        } else if (action.type === DeleteTaxeSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.taxes.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
