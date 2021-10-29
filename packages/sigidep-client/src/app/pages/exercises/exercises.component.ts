import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppService} from "@services/app.service";
import {DialogsService} from "@services/dialogs.service";
import {AppState} from "@reducers/index";
import {BaseComponent} from "@components/base.component";
import * as fromExercises from '@reducers/exercise.reducer';
import {ExerciseModel, ExerciseStatusType} from "@models/exercise.model";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {DeleteExercises, DeleteExercisesFailure, DeleteExercisesSuccess} from "@actions/exercises.actions";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-erercise',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent extends BaseComponent implements OnInit {

  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: ExerciseModel[] = [];
  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
  ) {
    super();
    this.tableColumns = [
      { field: 'code', title: 'tables.headers.exerciseCode', sortable: true },
      { field: 'startDate', title: 'tables.headers.startDate', sortable: true },
      { field: 'endDate', title: 'tables.headers.endDate', sortable: true },
      { field: 'status', title: 'tables.headers.status', sortable: false },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._appService.setAppBreadcrumb([
      {
        label: 'breadcrumb.exercises'
      },
    ]);
  }

  async openForm() {
    this._dialogService.launchExerciseCreateDialog();
  }

  getTagSeverity(status: ExerciseStatusType): string {
    switch (status) {
      case "hidden":
        return 'warning';
      case "active":
        return 'success';
      case "archived":
        return 'danger';
      case "preparing":
        return 'indo';
      default:
        return 'info';
    }
  }

  edit(item: ExerciseModel) {
    this._dialogService.launchExerciseCreateDialog(item);
  }

  delete(item: ExerciseModel) {
    this._handleDelete([item]);
  }

  deleteSelectedItems() {
    const canDelete = this.selectedItems?.filter(item => item.status !== 'active');
    this._handleDelete([...canDelete], canDelete?.length > 1);
  }

  private _initListeners() {
    this._store.pipe(
      this.takeUntilDestroy,
      select(fromExercises.getDataSelector)
    ).subscribe(data => this.data = data);

    this.loading$ = this._store.pipe(
      select(fromExercises.getLoadingSelector),
      map(status => status)
    );
    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(
          DeleteExercisesSuccess,
          DeleteExercisesFailure,
        )
      )
      .subscribe((action) => {
        if (action.type === DeleteExercisesFailure.type) {
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

        } else if (action.type === DeleteExercisesSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.exercises.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      })
  }

  private _handleDelete(items: ExerciseModel[], multi = false) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.' + (multi ? 'deleteExercises' : 'deleteExercise'),
      accept: () => {
        this._store.dispatch(DeleteExercises({ ids: items.map(item => item.id)}))
      },
    })
  }
}
