import { SetAppBreadcrumb } from '@actions/app.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/grades.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { GradeModel } from '@models/grade.model';
import {
  DeleteGrade,
  DeleteGradeFailure,
  DeleteGradeSuccess,
  GetGrades,
} from '@actions/grades.actions';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
})
export class GradesComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: GradeModel[] = [];
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
        field: 'description',
        title: 'tables.headers.label',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetGrades());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.grades',
          },
          {
            label: 'breadcrumb.agents',
            routerLink: ['/', 'agents'],
          },
          {
            label: 'breadcrumb.categories',
            routerLink: ['/', 'categories-agents'],
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchGradeCreateDialog();
  }

  edit(item: GradeModel) {
    this._dialogService.launchGradeCreateDialog(item);
  }

  delete(item: GradeModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteGrade',
      accept: () => {
        this._store.dispatch(DeleteGrade({ id: item.id }));
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
        ofType(DeleteGradeSuccess, DeleteGradeFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteGradeFailure.type) {
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
        } else if (action.type === DeleteGradeSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.grades.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
