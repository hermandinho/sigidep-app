import { getDataSelector, getLoadingSelector } from '@reducers/encours.reducer';
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

import { EncoursModel } from '@models/encours.model';
import {
  DeleteEncours,
  DeleteEncoursFailure,
  DeleteEncoursSuccess,
  GetEncours,
} from '@actions/encours.actions';
import { GetExercises, Go, SetAppBreadcrumb } from '@store/actions';

@Component({
  selector: 'app-encours',
  templateUrl: './encours.component.html',
  styleUrls: ['./encours.component.scss'],
})
export class EncoursComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: EncoursModel[] = [];
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
        field: 'exercise', //TODO: exerciseCode
        title: 'tables.headers.exercice',
        sortable: true,
      },
      {
        field: 'sousProgramme', //TODO: subProgram
        title: 'tables.headers.sousProgram',
        sortable: true,
      },
      {
        field: 'valeurSeuil',
        title: 'tables.headers.seuil',
        sortable: true,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetExercises({}));
    this._store.dispatch(GetEncours());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.encours',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchEncoursCreateDialog();
  }

  delete(item: GradeModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteEncours',
      accept: () => {
        this._store.dispatch(DeleteEncours({ id: item.id }));
      },
    });
  }

  reload(item: EncoursModel) {
    this._dialogService.launchEncoursCreateDialog({
      id: item.id,
      exercise: item.exercise.code,
      valeurSeuil: item.valeurSeuil,
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
        ofType(DeleteEncoursSuccess, DeleteEncoursFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteEncoursFailure.type) {
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
        } else if (action.type === DeleteEncoursSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.encours.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
  public showItem = (item: EncoursModel) => {
    this._store.dispatch(new Go({ path: ['encours/details', item.id] }));
  };
}
