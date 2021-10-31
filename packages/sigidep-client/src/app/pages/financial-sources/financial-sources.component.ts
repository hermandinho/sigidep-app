import {Component, OnInit} from '@angular/core';
import {AppService} from "@services/app.service";
import {DialogsService} from "@services/dialogs.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "@reducers/index";
import {Actions, ofType} from "@ngrx/effects";
import {BaseComponent} from "@components/base.component";
import {FinancialSourceModel} from "@models/index";
import {Observable, of} from "rxjs";
import {
  DeleteFinancialSource,
  DeleteFinancialSourceFailure,
  DeleteFinancialSourceSuccess,
  GetFinancialSources
} from "@store/actions";
import {map} from "rxjs/operators";
import {getDataSelector, getLoadingSelector} from "@reducers/financial-sources.reducer";

@Component({
  selector: 'app-financial-sources',
  templateUrl: './financial-sources.component.html',
  styleUrls: ['./financial-sources.component.scss']
})
export class FinancialSourcesComponent extends BaseComponent implements OnInit {

  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: FinancialSourceModel[] = [];
  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
  ) {
    super();
    this.tableColumns = [
      { field: 'code', title: 'tables.headers.exerciseCode', sortable: true, },
      { field: 'labelFr', title: 'tables.headers.labelFr', sortable: true, },
      { field: 'labelEn', title: 'tables.headers.labelEn', sortable: true, },
      { field: 'abbreviationFr', title: 'tables.headers.abbreviationFr', sortable: true, },
      { field: 'abbreviationEn', title: 'tables.headers.abbreviationEn', sortable: true, },
      { field: 'acceptsDeliverables', title: 'tables.headers.acceptsDeliverables' },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetFinancialSources());
    this._appService.setAppBreadcrumb([
      {
        label: 'breadcrumb.financialsources'
      },
    ]);
  }

  async openForm() {
    this._dialogService.launchFinancialSourcesCreateDialog();
  }

  edit(item: FinancialSourceModel) {
    this._dialogService.launchFinancialSourcesCreateDialog(item);
  }

  delete(item: FinancialSourceModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteFinancialSource',
      accept: () => {
        this._store.dispatch(DeleteFinancialSource({ id: item.id}))
      },
    })
  }

  private _initListeners() {
    this._store.pipe(
      this.takeUntilDestroy,
      select(getDataSelector)
    ).subscribe(data => this.data = [...data]);

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map(status => status)
    );
    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(
          DeleteFinancialSourceSuccess,
          DeleteFinancialSourceFailure,
        )
      )
      .subscribe((action) => {
        if (action.type === DeleteFinancialSourceFailure.type) {
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

        } else if (action.type === DeleteFinancialSourceSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.financialSources.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      })
  }

}
