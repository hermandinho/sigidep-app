import {
  DeleteAgent,
  DeleteAgentFailure,
  DeleteAgentSuccess,
  GetAgents,
} from '@actions/agents.actions';
import { SetAppBreadcrumb } from '@actions/app.actions';
import { GetCategoriesAgents } from '@actions/categorie-agent.actions';
import { GetGrades } from '@actions/grades.actions';
import { AgentModel } from '@models/agent.model';
import { getDataSelector, getLoadingSelector } from '@reducers/agents.reducer';
import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '@components/base.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: AgentModel[] = [];
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
        field: 'matricule',
        title: 'tables.headers.matricule',
        sortable: true,
      },
      {
        field: 'nomComplet',
        title: 'tables.headers.nomComplet',
        sortable: false,
      },
      {
        field: 'lieuNaissance',
        title: 'tables.headers.lieuNaissance',
        sortable: false,
      },
      {
        field: 'dateRecrutement',
        title: 'tables.headers.dateRecrutement',
        sortable: true,
      },
      {
        field: 'fonction',
        title: 'tables.headers.fonction',
        sortable: false,
      },
      {
        field: 'posteTravail',
        title: 'tables.headers.posteTravail',
        sortable: false,
      },
      {
        field: 'categorie',
        title: 'tables.headers.categorie',
        sortable: true,
      },
      {
        field: 'grade',
        title: 'tables.headers.grade',
        sortable: true,
      },
      {
        field: 'echelon',
        title: 'tables.headers.echelon',
        sortable: true,
      },
      {
        field: 'indice',
        title: 'tables.headers.indice',
        sortable: true,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetAgents());
    this._store.dispatch(GetGrades());
    this._store.dispatch(GetCategoriesAgents());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.agents',
          },
          {
            label: 'breadcrumb.grades',
            routerLink: ['/', 'grades'],
          },
          {
            label: 'breadcrumb.categories-agents',
            routerLink: ['/', 'categories-agents'],
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchAgentsCreateDialog();
  }

  edit(item: AgentModel) {
    this._dialogService.launchAgentsCreateDialog(item);
  }

  delete(item: AgentModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteAgent',
      accept: () => {
        this._store.dispatch(DeleteAgent({ id: item.id }));
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
        ofType(DeleteAgentSuccess, DeleteAgentFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteAgentFailure.type) {
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
        } else if (action.type === DeleteAgentSuccess.type) {
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
