import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AppService } from '@services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { Store } from '@ngrx/store';
import { AppState } from '@reducers/index';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@components/base.component';
import { SetAppBreadcrumb } from '@store/actions';

@Component({
  selector: 'app-sub-programs-list',
  templateUrl: './sub-programs-list.component.html',
  styleUrls: ['./sub-programs-list.component.scss'],
})
export class SubProgramsListComponent extends BaseComponent implements OnInit {
  public nodes!: TreeNode[];
  public columns: any = [];

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
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
}
