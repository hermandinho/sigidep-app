import { SetAppBreadcrumb } from '@actions/app.actions';
import { ArticleModel } from '@models/article.model';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/articles.reducer';
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
  DeleteArticle,
  DeleteArticleFailure,
  DeleteArticleSuccess,
  GetArticles,
} from '@actions/articles.actions';
import { GetRubriques } from '@actions/rubriques.actions';
import { GetSousRubriques } from '@actions/sous-rubriques.actions';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [AppService, DialogsService],
})
export class ArticlesComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: ArticleModel[] = [];
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
        field: 'rubrique',
        title: 'tables.headers.rubrique',
        sortable: false,
      },
      {
        field: 'sousRubrique',
        title: 'tables.headers.sousRubrique',
        sortable: false,
      },
      {
        field: 'code',
        title: 'tables.headers.code',
        sortable: true,
      },
      {
        field: 'designation',
        title: 'tables.headers.designation',
        sortable: false,
      },
      {
        field: 'conditionnement',
        title: 'tables.headers.conditionnement',
        sortable: false,
      },
      {
        field: 'prix',
        title: 'tables.headers.prix',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetArticles());
    this._store.dispatch(GetRubriques());
    this._store.dispatch(GetSousRubriques());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.articles',
            routerLink: ['/', 'articles'],
          },
          {
            label: 'breadcrumb.rubriques',
            routerLink: ['/', 'rubriques'],
          },
          {
            label: 'breadcrumb.sous-rubriques',
            routerLink: ['/', 'sous-rubriques'],
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchArticleCreateDialog();
  }

  edit(item: ArticleModel) {
    this._dialogService.launchArticleCreateDialog(item);
  }

  delete(item: ArticleModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteArticle',
      accept: () => {
        this._store.dispatch(DeleteArticle({ id: item.id }));
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
        ofType(DeleteArticleSuccess, DeleteArticleFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteArticleFailure.type) {
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
        } else if (action.type === DeleteArticleSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.agents.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
