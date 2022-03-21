import { Go } from '@actions/router.actions';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { RegionsModel } from '@models/regions.model';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { Observable, of } from 'rxjs';

import { DeleteRegion } from '@actions/regions.actions';
import { GetRegions } from '@actions/addresses.actions';
import { map } from 'rxjs/operators';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/addresses.reducer';
import { SetAppBreadcrumb } from '@store/actions';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent extends BaseComponent implements OnInit {
  public data: RegionsModel[] = [];
  public loading$: Observable<boolean> = of(true);
  public tableColumns: {
    title: string;
    field: string;
    sortable: boolean;
  }[] = [
    {
      title: 'tables.headers.code',
      field: 'code',
      sortable: true,
    },
    {
      title: 'tables.headers.labelFr',
      field: 'labelFr',
      sortable: true,
    },
    {
      title: 'tables.headers.labelEn',
      field: 'labelEn',
      sortable: true,
    },
  ];
  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions
  ) {
    super();
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetRegions());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.regions',
          },
        ],
      })
    );
  }

  openForm() {
    this._dialogService.launchRegionsCreateDialog();
  }

  showItem(item: any) {
    this._store.dispatch(new Go({ path: ['encours/details', item.id] }));
  }

  delete({ id }: { id: number }) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteRegion',
      accept: () => {
        this._store.dispatch(DeleteRegion({ id }));
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
  }
}
