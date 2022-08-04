import { SetAppBreadcrumb } from './../../store/actions/app.actions';
import { DeleteModelVirement, DeleteModelVirementFailure, DeleteModelVirementSuccess, GetModeleVirement } from '@actions/model-virement.actions';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './../../components/base.component';
import { ModeleVirementModel } from '@models/modele-virement.model';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from './../../store/reducers/index';
import { getDataSelector, getLoadingSelector } from '@reducers/modele-virement.reducer';
import { AppService } from './../../services/app.service';
import { DialogsService } from '@services/dialogs.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modele-virement',
  templateUrl: './modele-virement.component.html',
  styleUrls: ['./modele-virement.component.scss']
})
export class ModeleVirementComponent extends BaseComponent implements OnInit {
  tableColumns: any[] = [];
  data: ModeleVirementModel[] = [];
  loading$: Observable<boolean> = of(true);

  constructor(
    private readonly _appService: AppService,
    private readonly _dialogService: DialogsService,
    private _store: Store<AppState>,
    private readonly dispatcher: Actions,
    public translate: TranslateService) {
    super();

    this.tableColumns = [
      {
        field: 'nomModel',
        title: 'tables.headers.nomModel',
        sortable: true,
      },
      {
        field: 'enteteModel',
        title: 'tables.headers.enteteModel',
        sortable: true,
      },
      {
        field: 'chapeauModel',
        title: 'tables.headers.chapeauModel',
        sortable: true,
      },
      {
        field: 'contenuModel',
        title: 'tables.headers.contenuModel',
        sortable: true,
      },
    ];
  }

  ngOnInit(): void {
    this._store.dispatch(GetModeleVirement());
    this._store.dispatch(
      SetAppBreadcrumb({
        breadcrumb: [
          {
            label: 'breadcrumb.modelVirement',
          },
        ],
      })
    );
    this._initListeners();
  }

  edit(item: ModeleVirementModel) {
    this._dialogService.launchModelVirementCreateDialog(item);
  }

  delete(item: ModeleVirementModel) {
    this._appService.showConfirmation({
      message: 'dialogs.messages.deleteModelVirement',
      accept: () => {
        this._store.dispatch(DeleteModelVirement({ id: item.id }));
      },
    });
  }


  async openForm() {
    this._dialogService.launchModelVirementCreateDialog();
  }


  private _initListeners() {
    this._store
      .pipe(this.takeUntilDestroy, select(getDataSelector))
      .subscribe((data) => {
        this.data = (data || []).map(
          (d) =>
            new ModeleVirementModel({
              ...d,
            })
        );
      });

    this.loading$ = this._store.pipe(
      select(getLoadingSelector),
      map((status) => status)
    );

    this.dispatcher
      .pipe(
        this.takeUntilDestroy,
        ofType(DeleteModelVirementSuccess, DeleteModelVirementFailure)
      )
      .subscribe((action) => {
        if (action.type === DeleteModelVirementFailure.type) {
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
        } else if (action.type === DeleteModelVirementSuccess.type) {
          this._appService.showToast({
            severity: 'success',
            detail: 'messages.accreditation.deleteSuccess',
            summary: 'errors.success',
            closable: true,
          });
        }
      });
  }

}
