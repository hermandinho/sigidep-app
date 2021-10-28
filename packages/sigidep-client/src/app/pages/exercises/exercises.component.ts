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
    // private readonly _dialogService: DialogService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
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
    ])
  }

  async openForm() {
    const res = await this._dialogService.launchExerciseCreateDialog();
    console.log(res);
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

  edit(item: any) {}

  delete(item: any) {}

  private _initListeners() {
    this._store.pipe(
      this.takeUntilDestroy,
      select(fromExercises.getDataSelector)
    ).subscribe(data => this.data = data);

    this.loading$ = this._store.pipe(
      select(fromExercises.getLoadingSelector),
      map(status => status)
    );
  }
}
