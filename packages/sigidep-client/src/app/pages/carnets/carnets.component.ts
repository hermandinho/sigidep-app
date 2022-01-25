import { SetAppBreadcrumb } from '@actions/app.actions';
import { CarnetMandatModel } from '@models/carnet-mandat.model';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/carnets-mandats.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetAgents } from '@actions/agents.actions';
import {
  DeleteCarnetMandat,
  DeleteCarnetMandatFailure,
  DeleteCarnetMandatSuccess,
  GetCarnetMandats,
} from '@actions/carnets-mandats.actions';
import { GetExercises } from '@actions/exercises.actions';
import { ExerciseStatusType } from '@models/exercise.model';

@Component({
  selector: 'app-carnets',
  templateUrl: './carnets.component.html',
  styleUrls: ['./carnets.component.scss'],
})
export class CarnetsComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: CarnetMandatModel[] = [];
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
        field: 'exercice',
        title: 'tables.headers.exercice',
        sortable: true,
      },
      {
        field: 'code',
        title: 'tables.headers.numero',
        sortable: false,
      },
      {
        field: 'premierFeuillet',
        title: 'tables.headers.premierFeuillet',
        sortable: false,
      },
      {
        field: 'dernierFeuillet',
        title: 'tables.headers.dernierFeuillet',
        sortable: false,
      },
      {
        field: 'gestionnaire',
        title: 'tables.headers.gestionnaire',
        sortable: false,
      },
      {
        field: 'dateAffectation',
        title: 'tables.headers.dateAffectation',
        sortable: false,
      },
      {
        field: 'matAgentRetrait',
        title: 'tables.headers.matAgentRetrait',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetAgents());
    this._store.dispatch(GetCarnetMandats());
    this._store.dispatch(GetExercises({ status: 'in_progress' }));
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.carnets',
            routerLink: ['/', 'carnets'],
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchCarnetCreateDialog();
  }

  edit(item: CarnetMandatModel) {
    this._dialogService.launchCarnetCreateDialog(item);
  }

  affect(item: CarnetMandatModel) {
    this._dialogService.launchCarnetCreateDialog(item, true);
  }

  delete(item: CarnetMandatModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteCarnet',
      accept: () => {
        this._store.dispatch(DeleteCarnetMandat({ id: item.id }));
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
        ofType(DeleteCarnetMandatSuccess, DeleteCarnetMandatFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteCarnetMandatFailure.type) {
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
        } else if (action.type === DeleteCarnetMandatSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.carnets.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
