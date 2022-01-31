import { AgenceModel } from './../../models/agence.model';
import { AppService } from './../../services/app.service';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from './../../components/base.component';
import { map } from 'rxjs/operators';
import { SetAppBreadcrumb } from './../../store/actions/app.actions';
import { AppState } from './../../store/reducers/index';
import { Store, select } from '@ngrx/store';
import { DialogsService } from '@services/dialogs.service';
import { Observable, of } from 'rxjs';
import { BankModel } from '@models/index';
import { Component, OnInit } from '@angular/core';
import {
  DeleteAgenges,
  DeleteBanks,
  DeleteBanksFailure,
  DeleteBanksSuccess,
  GetBanks,
} from '@actions/banks-agences.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/banks-agences.reducers';

@Component({
  selector: 'app-banks-agences',
  templateUrl: './banks-agences.component.html',
  styleUrls: ['./banks-agences.component.scss'],
})
export class BanksAgencesComponent extends BaseComponent implements OnInit {
  data: BankModel[] = [];
  selectedItems: any[] = [];
  loading$: Observable<boolean> = of(true);
  tableColumns: any[] = [];

  constructor(
    private _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    private readonly _appService: AppService
  ) {
    super();

    this.tableColumns = [
      { field: 'code', title: 'tables.headers.code', sortable: true },
      { field: 'label', title: 'tables.headers.label', sortable: true },
    ];

    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetBanks());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.banksAgences',
          },
        ],
      })
    );
  }

  // MODAL FORM FOR BANK
  async openForm() {
    this._dialogService.launchBankCreateDialog();
  }

  edit(item: BankModel) {
    this._dialogService.launchBankCreateDialog(item);
  }

  delete(item: BankModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteBank',
      accept: () => {
        this._store.dispatch(DeleteBanks({ ids: [item.id] }));
      },
    });
  }
  // -- END -- MODAL FORM FOR BANK

  // MODAL FORM FOR AGENCE
  async openAgenceForm(bank: BankModel) {
    this._dialogService.launchAgengeBankCreateDialog(bank);
  }

  editAgence(bank: BankModel, item: AgenceModel) {
    this._dialogService.launchAgengeBankCreateDialog(bank, item);
  }

  deleteAgence(item: AgenceModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteAgence',
      accept: () => {
        this._store.dispatch(DeleteAgenges({ ids: [item.id] }));
      },
    });
  }
  // -- END -- MODAL FORM FOR AGENCE

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = (data || []).map(
          (d) =>
            new BankModel({
              ...d,
            })
        );
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteBanksSuccess, DeleteBanksFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteBanksFailure.type) {
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
        } else if (action.type === DeleteBanksSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.banks.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
