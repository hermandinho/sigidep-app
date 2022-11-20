import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base.component';
import { UserModel } from '../../models/user.model';
import { Observable, of } from 'rxjs';
import { AppService } from '../../services/app.service';
import { DialogsService } from '../../services/dialogs.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers/index';
import { Actions, ofType } from '@ngrx/effects';
import { GetUsers, DeleteUsers, DeleteUsersSuccess, DeleteUsersFailure } from '../../store/actions/users.actions';
import { SetAppBreadcrumb } from '../../store/actions/app.actions';
import { getDataSelector, getLoadingSelector } from '@reducers/user.reducer';
import { map } from 'rxjs/operators';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {
  selectedItems: any[] = [];
  tableColumns: any[] = [];
  data: UserModel[] = [];
  loading$: Observable<boolean> = of(true);
  checked: boolean = false;

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    private _apisService: ApisService,
  ) {
    super();

    this.tableColumns = [
      {
        field: 'fullName',
        title: 'tables.headers.names',
        sortable: true,
      },
      {
        field: 'username',
        title: 'tables.headers.userName',
        sortable: false,
      },
      {
        field: 'status',
        title: 'tables.headers.status',
        sortable: false,
      },
    ];
    this._initListeners();
  }

  ngOnInit(): void {
    this._store.dispatch(GetUsers());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.Users',
          },
        ],
      })
    );
  }

  async openForm() {
    this._dialogService.launchUserCreateDialog();
  }

  edit(item: UserModel) {
    this._dialogService.launchUserCreateDialog(item);
  }

  info(item: UserModel) {
    this._dialogService.launchPrintInfoUserDialog(item);
  }

  desactiver(item: UserModel) {
    if(item.status === 'active') {
      this._appService.showConfirmation({
        message: 'dialogs.messages.desactiver',
        accept: () => {
          this.user(item);
        },
      });
    }else {
      this._appService.showConfirmation({
        message: 'dialogs.messages.activer',
        accept: () => {
          this.user(item);
        },
      });
    }
  }

  user(item: UserModel) {
    this._apisService
    .put<UserModel>('/users', item)
    .subscribe(
      (res) => {
        this._store.dispatch(GetUsers());
        this._appService.showToast({
          summary: 'messages.success',
          detail: 'messages.users.createSuccess',
          severity: 'success',
          life: 3000,
          closable: true,
        });
      },
      ({ error }) => {
        let err = '';
        if (error?.statusCode === 409) {
          err = 'errors.users.notfound';
        } else {
          err = 'errors.unknown';
        }
        this._appService.showToast({
          detail: err,
          summary: 'errors.error',
          severity: 'error',
          life: 5000,
          closable: true,
        });
      }
    );
  }

  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = [...data];
        console.log('users', this.data)
      });
    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );
    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteUsersSuccess, DeleteUsersFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteUsersFailure.type) {
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
        } else if (action.type === DeleteUsersSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.users.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }
}
