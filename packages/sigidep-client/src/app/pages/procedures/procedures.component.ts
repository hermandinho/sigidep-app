import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/exec-procedure.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExecProcedureModel } from '@models/exec-procedure.model';
import {
  DeleteProcedure,
  DeleteProcedureFailure,
  DeleteProcedureSuccess,
  GetProcedures,
} from '@actions/exec-procedure.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss'],
})
export class ProceduresComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: ExecProcedureModel[] = [];
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
        field: 'RIB',
        title: 'tables.headers.RIB',
        sortable: true,
      },
      {
        field: 'TxIR',
        title: 'tables.headers.TxIR',
        sortable: true,
      },
      {
        field: 'TxTVA',
        title: 'tables.headers.TxTVA',
        sortable: true,
      },
      {
        field: 'nomContribuable',
        title: 'tables.headers.nomContribuable',
        sortable: true,
      },
      {
        field: 'numContribuable',
        title: 'tables.headers.numContribuable',
        sortable: true,
      },
      {
        field: 'nomAgent',
        title: 'tables.headers.nomAgent',
        sortable: true,
      },
      {
        field: 'typeProcedure',
        title: 'tables.headers.typeProcedure',
        sortable: true,
      },
      {
        field: 'matriculeAgent',
        title: 'tables.headers.matriculeAgent',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetProcedures());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.procedures',
          },
          {
            label: 'breadcrumb.taxes',
            routerLink: ['/', 'taxes'],
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
    this._dialogService.launchProcedureCreateDialog();
  }

  edit(item: ExecProcedureModel) {
    this._dialogService.launchProcedureCreateDialog(item);
  }

  delete(item: ExecProcedureModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteProcedure',
      accept: () => {
        this._store.dispatch(DeleteProcedure({ id: item.id }));
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
        ofType(DeleteProcedureSuccess, DeleteProcedureFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteProcedureFailure.type) {
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
        } else if (action.type === DeleteProcedureSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.procedures.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
