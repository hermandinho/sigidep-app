import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base.component';
import { StructureModel } from '../../models/structure.model';
import { Observable, of } from 'rxjs';
import { AppService } from '../../services/app.service';
import { DialogsService } from '../../services/dialogs.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { SetAppBreadcrumb } from '../../store/actions/app.actions';
import { StructuresService } from '../../services/structures.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: StructureModel[] = [];
  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    private structuresService: StructuresService
  ) {
    super();

    this.tableColumns = [
      {
        field: 'code',
        title: 'tables.headers.code',
        sortable: true,
      },
      {
        field: 'estPrincipal',
        title: 'tables.headers.estPrincipal',
        sortable: true,
      },
      {
        field: 'labelFr',
        title: 'tables.headers.labelFr',
        sortable: false,
      },
      {
        field: 'labelEn',
        title: 'tables.headers.labelEn',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.structure',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchStructureCreateDialog();
  }

  edit(item: StructureModel) {
    this._dialogService.launchStructureCreateDialog(item);
  }

  delete(item: StructureModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteStructure',
      accept: () => {
        this.structuresService.delete(item.id)
      },
    });
  }

  private _initListeners() {
    this.structuresService.get().then((res:StructureModel[])=>{
      this.data = res;
      console.log(res)
    }).catch((e)=>console.log(e))
  }

}
