import { Component, OnInit } from '@angular/core';
import { FinancialSourceModel, ParagraphModel } from '@models/index';
import { Observable, of } from 'rxjs';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import {
  DeleteFinancialSourceFailure,
  DeleteFinancialSourceSuccess,
  DeleteParagraph,
  GetParagraphs,
  SetAppBreadcrumb,
} from '@store/actions';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/paragraphs.reducer';
import { map } from 'rxjs/operators';
import { BaseComponent } from '@components/base.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.scss'],
})
export class ParagraphsComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: ParagraphModel[] = [];
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
      {
        field: 'abbreviationFr',
        title: 'tables.headers.abbreviationFr',
        sortable: true,
      },
      {
        field: 'abbreviationEn',
        title: 'tables.headers.abbreviationEn',
        sortable: true,
      },
      { field: 'nature', title: 'tables.headers.nature' },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetParagraphs());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.paragraphs',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchParagraphCreateDialog();
  }

  edit(item: ParagraphModel) {
    this._dialogService.launchParagraphCreateDialog(item);
  }

  delete(item: ParagraphModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteParagraph',
      accept: () => {
        this._store.dispatch(DeleteParagraph({ id: item.id }));
      },
    });
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [
          ...data.map((item) => {
            const tmp = { ...item };
            tmp.nature = tmp.nature && new FinancialSourceModel(tmp.nature);
            return tmp;
          }),
        ];
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
            detail: 'messages.paragraphs.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
