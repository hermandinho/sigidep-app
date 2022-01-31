import { AppService } from './../../services/app.service';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from './../../components/base.component';
import { map } from 'rxjs/operators';
import { SetAppBreadcrumb } from './../../store/actions/app.actions';
import { AppState } from './../../store/reducers/index';
import { Store, select } from '@ngrx/store';
import { DialogsService } from '@services/dialogs.service';
import { Observable, of } from 'rxjs';
import { ContribuableBugetaireModel } from '@models/index';
import { Component, OnInit } from '@angular/core';
import {
  DeleteContribuableBugetaire,
  DeleteContribuableBugetaireSuccess,
  DeleteContribuableBugetaireFailure,
  GetContribuablesBugetaires,
} from '@actions/contribuables-budgetaires.actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/contribuables-budgetaires.reducer';

@Component({
  selector: 'app-contribuables-budgetaires',
  templateUrl: './contribuables-budgetaires.component.html',
  styleUrls: ['./contribuables-budgetaires.component.scss'],
})
export class ContribuablesBudgetairesComponent
  extends BaseComponent
  implements OnInit
{
  data: ContribuableBugetaireModel[] = [];
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
      {
        field: 'raisonSociale',
        title: 'tables.headers.raisonSociale',
        sortable: true,
      },
      {
        field: 'banque.label',
        title: 'tables.headers.bankAgence',
        sortable: true,
      },
      {
        field: 'numeroCompte',
        title: 'tables.headers.numeroCompte',
        sortable: true,
      },
      { field: 'cle', title: 'tables.headers.cle', sortable: true },
    ];

    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetContribuablesBugetaires());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.contribuablesBudgetaires',
          },
        ],
      })
    );
  }

  // MODAL FORM FOR BANK
  async openForm() {
    this._dialogService.launchContribuablesBudgetairesCreateDialog();
  }

  edit(item: ContribuableBugetaireModel) {
    this._dialogService.launchContribuablesBudgetairesCreateDialog(item);
  }

  delete(item: ContribuableBugetaireModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteContribuableBudgetaire',
      accept: () => {
        this._store.dispatch(DeleteContribuableBugetaire({ id: item.id }));
      },
    });
  }
  // -- END -- MODAL FORM FOR BANK

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = (data || []).map(
          (d) =>
            new ContribuableBugetaireModel({
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
        ofType(
          DeleteContribuableBugetaireSuccess,
          DeleteContribuableBugetaireFailure
        )
      )
      .subscribe((action) => {
        if (action.type === DeleteContribuableBugetaireFailure.type) {
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
        } else if (action.type === DeleteContribuableBugetaireSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.contribuablesBudgetaires.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
