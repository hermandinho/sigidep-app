import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import {
  DeleteAdministrativeUnit,
  DeleteFinancialSource,
  DeleteFinancialSourceFailure,
  DeleteFinancialSourceSuccess,
  GetAdministrativeUnites,
  SetAppBreadcrumb,
} from '@store/actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/administrative-units.reducer';
import { map } from 'rxjs/operators';
import {
  AdministrativeUnitModel,
  CategoryModel,
  FunctionModel,
  RegionsModel,
  SectorModel,
} from '@models/index';

@Component({
  selector: 'app-administrative-units',
  templateUrl: './administrative-units.component.html',
  styleUrls: ['./administrative-units.component.scss'],
})
export class AdministrativeUnitsComponent
  extends BaseComponent
  implements OnInit
{
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: AdministrativeUnitModel[] = [];
  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions
  ) {
    super();
    this.tableColumns = [
      { field: 'code', title: 'tables.headers.code' },
      // { field: 'labelFr', title: 'tables.headers.labelFr' },
      // { field: 'labelEn', title: 'tables.headers.labelEn' },
      // { field: 'abbreviationFr', title: 'tables.headers.abbreviationFr' },
      // { field: 'abbreviationEn', title: 'tables.headers.abbreviationEn' },
      // { field: 'category.formattedLabel', title: 'tables.headers.category' },
      // { field: 'region.formattedLabel', title: 'tables.headers.region' },
      // { field: 'sector.formattedLabel', title: 'tables.headers.sector' },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetAdministrativeUnites());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.administrativeunits',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchAdministrativeUnitCreateDialog();
  }

  edit(item: AdministrativeUnitModel) {
    this._dialogService.launchAdministrativeUnitCreateDialog(item);
  }

  delete(item: AdministrativeUnitModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteAdministrativeUnit',
      accept: () => {
        this._store.dispatch(DeleteAdministrativeUnit({ id: item.id }));
      },
    });
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = (data || []).map((d) => {
          d = new AdministrativeUnitModel(d);
          if (d.category) d.category = new CategoryModel(d.category);
          if (d.sector) d.sector = new SectorModel(d.sector);
          if (d.function) d.function = new FunctionModel(d.function);
          if (d.region) d.region = new RegionsModel(d.region);
          return d;
        });
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteFinancialSourceSuccess, DeleteFinancialSourceFailure)
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
            detail: 'messages.administrativeSources.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
