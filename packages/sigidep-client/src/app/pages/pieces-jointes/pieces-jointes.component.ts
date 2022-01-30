import { SetAppBreadcrumb } from '@actions/app.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/pieces-jointes.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { PieceJointeModel } from '@models/piece-jointe.model';
import {
  DeletePieceJointe,
  DeletePieceJointeFailure,
  DeletePieceJointeSuccess,
  GetPiecesJointes,
} from '@actions/piece-jointe.actions';

@Component({
  selector: 'app-pieces-jointes',
  templateUrl: './pieces-jointes.component.html',
  styleUrls: ['./pieces-jointes.component.scss'],
})
export class PiecesJointesComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: PieceJointeModel[] = [];
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
        field: 'order',
        title: 'tables.headers.order',
        sortable: false,
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
    this._store.dispatch(GetPiecesJointes());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.piecesJointes',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchPieceJointeCreateDialog();
  }

  edit(item: PieceJointeModel) {
    this._dialogService.launchPieceJointeCreateDialog(item);
  }

  delete(item: PieceJointeModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deletePieceJointe',
      accept: () => {
        this._store.dispatch(DeletePieceJointe({ id: item.id }));
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
        ofType(DeletePieceJointeSuccess, DeletePieceJointeFailure)
      )
      .subscribe((action) => {
        if (action.type === DeletePieceJointeFailure.type) {
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
        } else if (action.type === DeletePieceJointeSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.piecesjointes.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
