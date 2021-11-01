import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AppService} from "@services/app.service";
import {DialogsService} from "@services/dialogs.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "@reducers/index";
import {Actions, ofType} from "@ngrx/effects";
import {
  DeleteTechnicalSupervisor,
  DeleteTechnicalSupervisorFailure,
  DeleteTechnicalSupervisorSuccess,
  GetTechnicalSupervisors
} from "@store/actions";
import {TechnicalSupervisorModel} from "@models/technical-supervisor.model";
import {getDataSelector, getLoadingSelector} from "@reducers/technical-supervisors.reducer";
import {map} from "rxjs/operators";
import {BaseComponent} from "@components/base.component";

@Component({
  selector: 'app-technical-supervisors',
  templateUrl: './technical-supervisors.component.html',
  styleUrls: ['./technical-supervisors.component.scss']
})
export class TechnicalSupervisorsComponent extends BaseComponent implements OnInit {

  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: TechnicalSupervisorModel[] = [];
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
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetTechnicalSupervisors());
    this._appService.setAppBreadcrumb([
      {
        label: 'breadcrumb.technicalSupervisors'
      },
    ]);
  }

  async openForm() {
    this._dialogService.launchTechnicalSupervisorCreateDialog();
  }

  edit(item: TechnicalSupervisorModel) {
    this._dialogService.launchTechnicalSupervisorCreateDialog(item);
  }

  delete(item: TechnicalSupervisorModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteTechnicalAdvisor',
      accept: () => {
        this._store.dispatch(DeleteTechnicalSupervisor({ id: item.id}))
      },
    });
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
          DeleteTechnicalSupervisorSuccess,
          DeleteTechnicalSupervisorFailure,
        )
      )
      .subscribe((action) => {
        if (action.type === DeleteTechnicalSupervisorFailure.type) {
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

        } else if (action.type === DeleteTechnicalSupervisorSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.technicalSupervisions.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      })
  }

}
