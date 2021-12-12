import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { ReferencePhysicalUnitModel } from '@models/reference-physical-unit.model';
import {
  DeleteFinancialSourceFailure,
  DeleteFinancialSourceSuccess,
  DeleteParagraph,
  GetReferencePhysicalUnits,
  SetAppBreadcrumb,
} from '@store/actions';
import { ParagraphModel } from '@models/paragraph.model';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/reference-physical-units.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reference-physical-units',
  templateUrl: './reference-physical-units.component.html',
  styleUrls: ['./reference-physical-units.component.scss'],
})
export class ReferencePhysicalUnitsComponent
  extends BaseComponent
  implements OnInit
{
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: ReferencePhysicalUnitModel[] = [];
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
      { field: 'code', title: 'tables.headers.exerciseCode', sortable: true },
      { field: 'labelFr', title: 'tables.headers.labelFr', sortable: true },
      { field: 'labelEn', title: 'tables.headers.labelEn', sortable: true },
      { field: 'paragraph', title: 'tables.headers.paragraph' },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetReferencePhysicalUnits());
    // this._store.dispatch(GetParagraphs());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.referencePhysicalUnits',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.referencePhysicalUnitCreateDialog();
  }

  edit(item: ReferencePhysicalUnitModel) {
    this._dialogService.referencePhysicalUnitCreateDialog(item);
  }

  delete(item: ParagraphModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.referencePhysicalUnits',
      accept: () => {
        this._store.dispatch(DeleteParagraph({ id: item.id }));
      },
    });
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = (data || []).map(
          (d) =>
            new ReferencePhysicalUnitModel({
              ...d,
              paragraph: new ParagraphModel(d?.paragraph),
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
            detail: 'messages.referencePhysicalUnits.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
