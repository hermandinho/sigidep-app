import { SetAppBreadcrumb } from '@actions/app.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/baremes.reducer';
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
  DeleteBareme,
  DeleteBaremeFailure,
  DeleteBaremeSuccess,
  GetBaremes,
} from '@actions/baremes.actions';
import { BaremeMissionModel } from '@models/bareme-mission.model';

@Component({
  selector: 'app-baremes',
  templateUrl: './baremes.component.html',
  styleUrls: ['./baremes.component.scss'],
})
export class BaremesComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: BaremeMissionModel[] = [];
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
        field: 'montant',
        title: 'tables.headers.montant',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetBaremes());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.baremes',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchBaremeCreateDialog();
  }

  edit(item: BaremeMissionModel) {
    this._dialogService.launchBaremeCreateDialog(item);
  }

  delete(item: BaremeMissionModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteBareme',
      accept: () => {
        this._store.dispatch(DeleteBareme({ id: item.id }));
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
        ofType(DeleteBaremeSuccess, DeleteBaremeFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteBaremeFailure.type) {
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
        } else if (action.type === DeleteBaremeSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.baremes.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
