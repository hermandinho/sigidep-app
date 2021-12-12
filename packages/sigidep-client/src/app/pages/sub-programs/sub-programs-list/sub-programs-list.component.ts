import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@components/base.component';
import { GetSubPrograms, SetAppBreadcrumb } from '@store/actions';
import {
  SubProgramActivityModel,
  SubProgramActivityTaskModel,
  SubProgramModel,
} from '@models/sub-program.model';
import { Observable, of } from 'rxjs';
import {
  getDataSelector,
  getLoadingSelector,
} from '@reducers/sub-programs.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sub-programs-list',
  templateUrl: './sub-programs-list.component.html',
  styleUrls: ['./sub-programs-list.component.scss'],
})
export class SubProgramsListComponent extends BaseComponent implements OnInit {
  public columns: any = [];
  public data!: SubProgramModel[];
  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService
  ) {
    super();

    this._initSubscriptions();
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  ngOnInit(): void {
    this._store.dispatch(GetSubPrograms());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.subPrograms',
            routerLink: ['/', 'sub-programs'],
          },
          {
            label: 'breadcrumb.list',
          },
        ],
      })
    );
    this.columns = [{ field: 'F 1' }, { field: 'F 2' }];
  }

  public async addActivity(sp: SubProgramModel): Promise<void> {
    const ret = await this._dialogService.launchSubProgramActivityCreateDialog(
      sp
    );
  }

  private _initSubscriptions() {
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = (data || []).map((d) => {
          const obj = new SubProgramModel(d);
          obj.activities = (obj.activities || []).map(
            (a) =>
              new SubProgramActivityModel({
                ...a,
                tasks: (a.tasks || []).map(
                  (t) => new SubProgramActivityTaskModel(t)
                ),
              })
          );
          return obj;
        });
      });
  }
}
