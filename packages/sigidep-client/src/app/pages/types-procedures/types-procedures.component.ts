import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/types-procedures.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TypeProcedureModel } from '@models/type-procedure.model';
import {
  DeleteTypeProcedure,
  DeleteTypeProcedureFailure,
  DeleteTypeProcedureSuccess,
  GetTypesProcedures,
} from '@actions/types-procedures.actions';

@Component({
  selector: 'app-types-procedures',
  templateUrl: './types-procedures.component.html',
  styleUrls: ['./types-procedures.component.scss'],
})
export class TypesProceduresComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: TypeProcedureModel[] = [];
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
    this._store.dispatch(GetTypesProcedures());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.typesProcedures',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchTypeProcedureCreateDialog();
  }

  edit(item: TypeProcedureModel) {
    this._dialogService.launchTypeProcedureCreateDialog(item);
  }

  delete(item: TypeProcedureModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteTypeProcedure',
      accept: () => {
        this._store.dispatch(DeleteTypeProcedure({ id: item.id }));
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
        ofType(DeleteTypeProcedureSuccess, DeleteTypeProcedureFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteTypeProcedureFailure.type) {
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
        } else if (action.type === DeleteTypeProcedureSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.typesProcedures.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
